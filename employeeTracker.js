const inquirer = require('inquirer');
const mysql = require('mysql');
const clear = require('clear');
const managerQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM' +
' employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE' +
' department_name = "Management";';

// const empQuery = 'SELECT * FROM roles;SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management";'
const empQuery = 'SELECT * FROM roles;Select * from departments'

const getManager = () => {
	connection.query(managerQuery, (err, results) => {
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: 'manager',
					type: 'list',
					choices: function () {
						const managerArray = results.map(choice => choice.full_name);
						return managerArray;
					},
					message: 'Choose your Manager:'
				}
			]).then((answer) => {
				console.log(answer);
		});
	});
}

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "emptracker",
	multipleStatements: true

});

connection.connect(function(err) {
	if (err) throw err;
	// run the start function after the connection is made to prompt the user
	runCMS();;
});

function viewEmployees (){
	clear();
	console.log('\n');
	connection.query('SELECT * FROM employees INNER JOIN roles USING (id) INNER JOIN departments USING' +
		' (id)', function(err, res) {
		console.log('     Employee Information ');
		console.table(res);
		console.log('\n');
		runCMS();
	})
}

function viewDepartments () {
	clear();
	console.log('\n');	connection.query('SELECT * FROM departments', function (err, res) {

		console.log('\n')
		console.table(res);
		console.log('\n');
		runCMS();
	});
}

function viewRoles (){
	clear();
	console.log('\n');
	connection.query('SELECT * FROM roles', function (err, res) {
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
			connection.query('INSERT IGNORE INTO departments SET ?', { // How to keep from duplicates?
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
				type: 'list',
				choices: ["Manager","Engineer","Sales","Operations","Humane Resources"]
			},{
				name: 'salary',
				type: 'input',
				message: 'Enter employee salary',
			},{
				name: 'departments',
				type: 'list',
				choices: ["Management","Engineering","Sales","Legal","Humane Resources"]
			}
		])
		.then(function (answer) {
			connection.query('INSERT INTO roles SET ?',
				{
					title: answer.title,
					salary: answer.salary,
					name: answer.department
				},
				function (err) {
					if (err) throw err;
				})
			runCMS();
		});
	}

function updateRole (){
	console.log('Selected update role');
	console.log('\n');
}

function addEmployees () {
	connection.query(empQuery, (err, results) => {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: 'firstName',
					type: 'input',
					message: 'Enter first name of employee'
				}, {
					name: 'lastName',
					type: 'input',
					message: 'Enter last name of employee'
				}, {
					name: 'role',
					type: 'list',
					message: 'Select role',
					choices: function () {
						// console.log(results[0]);
						let roles = results[0].map(role => role.title);
						return roles;
					}
				}, {
					name: 'department',
					type: 'list',
					message: 'Select Department',
					choices: function () {
						// console.log(results[1]);
						let departments = results[1].map(department => department.department_name);
						return departments;
					}
				}, {
					name: 'salary',
					type: 'input',
					message: 'Enter employee salary',
				},
			]).then(function (answer) {
			connection.query(
				'INSERT INTO roles SET ?',
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
				'INSERT INTO departments SET ?',
				{
					department_name: answer.department
				},
				function (err) {
					if (err) throw err;

				},
			)
				// console.log(answer);
		});
	});
}


			// addDepartments(answer.name);


			// connection.query(
			// 	'INSERT INTO employees SET ?',
			// 	{
			// 		first_name: answer.firstName,
			// 		last_name: answer.lastName,
			// 		role_id: answer.role_id,
			// 		manager_id: answer.manager_id
			// 	},
			// 	function (err) {
			// 		if (err) throw err;
			// 		connection.end();
				// },
			//
			// );

		// });
// }


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

