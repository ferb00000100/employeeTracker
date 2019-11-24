const inquirer = require('inquirer');
const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "bik3rm0n",
	database: "emptracker"
});

connection.connect(function(err) {
	if (err) throw err;
	// run the start function after the connection is made to prompt the user
	runCMS();;
});

function viewEmployees (){
	console.log('Selected view employees');
	connection.query('SELECT * FROM employee INNER JOIN role USING (id) INNER JOIN department USING (id)', function(err, res) {
	// connection.query('SELECT * FROM employee', function(err, res) {
		console.log('-----------------------------------------');
		console.log('     Employee Information ');
		console.log('-----------------------------------------');
		for (let i = 0; i < res.length; i++){
		// console.log(res[i].id + " | " + res[i].first_name + ' ' + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
		console.log(res[i].id + " | " + res[i].first_name + ' ' + res[i].last_name + " | " + res[i].title + " | " + res[i].name + " | " + res[i].salary);
		if (err) throw err;
		}
		console.log('-----------------------------------------');
		runCMS();
	})

}

function viewDepartments (){
	console.log('Selected view departments');
}

function viewRoles (){
	console.log('Selected view roles');
}

function addDepartments (){
	console.log('Selected add departments');
}

function addRoles (){
	console.log('Selected add roles');
}

function addEmployees (){
	console.log('Selected Add employees');
	inquirer
		.prompt([
			{
				name: 'firstName',
				type: 'input',
				message: 'Enter first name of employee'
			},{
				name: 'lastName',
				type: 'input',
				message: 'Enter last name of employee'
			},{
				name: 'roleID',
				type: 'input',
				message: 'Enter role ID',
			},{
				name: 'manager',
				type: 'input',
				message: 'Enter manager',
			},{
				name: 'title',
				type: 'input',
				message: 'Enter employee title',
			},{
				name: 'salary',
				type: 'input',
				message: 'Enter employee salary',
			},{
				name: 'department_id',
				type: 'input',
				message: 'Enter department ID',
			},{
				name: 'name',
				type: 'input',
				message: 'Enter department name',
			}
		])
		.then(function (answer) {
			connection.query(
			'INSERT INTO employee SET ?',
				{
					first_name: answer.firstName,
					last_name: answer.lastName,
					role_id: answer.roleID,
					manager: answer.manager
				},
				function (err) {
					if (err) throw err;
					// connection.end();
				},

		);
			connection.query(
				'INSERT INTO role SET ?',
				{
					title: answer.title,
					salary: answer.salary,
					department_id: answer.department_id
				},
				function (err) {
					if (err) throw err;
					connection.end();
				},
			)
			connection.query(
				'INSERT INTO department SET ?',
				{
					name: answer.name,
				},
				function (err) {
					if (err) throw err;
					connection.end();
				},
			)

			runCMS();
		});
}

function updateRole (){
	console.log('Selected update role');
}

function runCMS () {
	return inquirer.prompt(
		choice = [
		{
			type: "list",
			name: "Inquiry",
			message: "Select your choice",
			choices: ["View all employees", "View departments", "View roles", "Add departments", "Add roles", "Add" +
			" employees", "Update employee role", "exit"]
		},
		])
		.then(answers => {
			let choice = answers.Inquiry;
			choice.trim();
			console.log(choice);
			switch (choice) {
				case 'View all employees':
					viewEmployees();
					break;
				case 'View departments':
					viewDepartments();
					break;
				case 'View roles':
					viewRoles();
					break;
				case 'Add departments':
					addDepartments();
					break;
				case 'Add roles':
					addRoles();
					break;
				case 'Add employees':
					addEmployees();
					break;
				case 'Update employee role':
					updateRole();
					break;
				case 'exit':
					connection.end();
					break;
				default:
					return

			}
		});
}

