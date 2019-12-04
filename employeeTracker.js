const inquirer = require('inquirer');
const mysql = require("mysql");
const clear = require('clear');

// let nameArray = [];

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
	clear();
	console.log('\n');
	connection.query('SELECT * FROM employee INNER JOIN role USING (id) INNER JOIN department USING' +
		' (id)', function(err, res) {
		console.log('     Employee Information ');
		console.table(res);
		console.log('\n');
		runCMS();
	})
}

function viewDepartments () {
	clear();
	console.log('\n');
	connection.query('SELECT * FROM department', function (err, res) {
		console.log('\n')
		console.table(res);
		console.log('\n');
		runCMS();
	});
}

function viewRoles (){
	clear();
	console.log('\n');
	connection.query('SELECT * FROM role', function (err, res) {
		console.table(res);
		runCMS();
	});
}

function remove(names) {
	// console.log(names);
let name ='';
	for (let i = 0; i < names.length; i++ ) {
		console.log(names[i]);
	}
		inquirer
			.prompt([
				{
					name: 'name',
					type: 'list',
					message: 'Select the employee to be removed',
					choices: [names[i]]
				}
			])


	}

function deleteEmployee (){
	let nameArray = [];
	console.log('\n');
	// console.log('Selected delete employee');
	connection.query('SELECT first_name, last_name from employee', function (err,res) {
		for (let i = 0; i < res.length; i++) {

			let name = `${res[i].first_name} ${res[i].last_name}`;
			nameArray.push(name);
				}
		remove(nameArray);
	})
}

function addDepartments () {
	console.log('\n');
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'Enter department name'
			}
		])
		.then(function (answer) {
			connection.query('INSERT IGNORE INTO department SET ?', { // How to keep from duplicates?
					name: answer.name,
				},
				function (err) {
					if (err) throw err;

				})

			runCMS();
		});
}

function addRoles() {
	console.log('\n');
	inquirer
		.prompt([
		{
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
		}
		])
		.then(function (answer) {
			connection.query('INSERT INTO role SET ?',
				{
					title: answer.title,
					salary: answer.salary,
					department_id: answer.department_id
				},
				function (err) {
					if (err) throw err;
					connection.end();
				})
			runCMS();

		});
	}

function updateRole (){
	console.log('Selected update role');
	console.log('\n');
}

function addEmployees (){
	console.log('\n');
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
				type: 'list',
				message: 'Select role ID',
				choices: [100,101,102,103,104,105]
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
			addRoles();
			// connection.query(
			// 	'INSERT INTO role SET ?',
			// 	{
			// 		title: answer.title,
			// 		salary: answer.salary,
			// 		department_id: answer.department_id
			// 	},
			// 	function (err) {
			// 		if (err) throw err;
			// 		connection.end();
			// 	},
			// )

			addDepartments(answer.name);
			//
			// connection.query(
			// 	'INSERT INTO department SET ?',
			// 	{
			// 		name: answer.name,
			// 	},
			// 	function (err) {
			// 		if (err) throw err;
			//
			// 	},
			// )
			// connection.end();

			runCMS();
		});
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
			// choices: ["View all employees", "View departments", "View roles", "Add departments", "Add roles", "Add" +
			// " employees", "Update employee role", "Delete employee", "exit"]
		},
		])
		.then(answers => {
			let choice = answers.Inquiry;
			choice.trim();
			console.log(choice);
			console.log('\n');
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
				// case 'Delete employee':
					// deleteEmployee();
					// break;
				case 'exit':
					connection.end();
					break;
				default:
					return

			}
		});
}

