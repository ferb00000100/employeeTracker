
const inquirer = require('inquirer');
const mysql = require('mysql');
const clear = require('clear');
const empQuery = 'SELECT * FROM roles;Select * from departments;SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM' +
	' employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE' +
	' department_name = "Management";';
const employeeQuery = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
FROM employees e
LEFT JOIN roles r 
ON r.id = e.role_id 
LEFT JOIN departments d 
ON d.id = r.department_id
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;\`
`

// create the connection information for the sql database
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "emptracker",
	multipleStatements: true

});

function viewEmployees (){
	clear();
	console.log('\n');
	connection.query(employeeQuery, function(err, res) {
		console.log('     Employee Information ');
		console.table(res[0]);
		console.log('\n');
		runCMS();
	})
}

function viewDepartments () {
	clear();
	console.log('\n');
	connection.query('SELECT * FROM departments', function (err, res) {
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
					department_name: answer.name,
				},
				function (err) {
					if (err) throw err;

				})

			runCMS();
		});
}

function insertNewRole(title, salary, departmentId) {
	connection.query('INSERT INTO roles SET ?',
					{
						title: title,
						salary: salary,
						department_id: departmentId
					},
					function (err) {
						if (err) throw err;
					})
				runCMS();

}

function addRoles() {
	connection.query(empQuery, (err, results) => {
		if (err) throw err;
		console.log('\n');
		inquirer
			.prompt([
				{
					name: 'title',
					type: 'input',
					message: 'Enter title of new role'
				}, {
					name: 'salary',
					type: 'input',
					message: 'Enter role salary',
				}, {
					name: 'Department',
					type: 'list',
					message: 'Select Role department',
					choices: function () {
						// console.log(results[1]);
						let departments = results[1].map(department => department.department_name);
						return departments;
					}
				}
			]).then(function (answer) {
				// console.log(answer.Department);
				const department =  "'"+answer.Department+"'"
				const title = answer.title
				const salary = answer.salary

				const insertQuery = 'SELECT id FROM departments where department_name = '+ department;
				console.log(insertQuery);
				connection.query(insertQuery, function (err, res) {
				const departmentId = res[0].id;
					// console.log(res[0].id);
					insertNewRole(title, salary, departmentId);

			})
		});
	});
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
						// console.log(roles);
						return roles;
					}
				}, {
					name: 'salary',
					type: 'input',
					message: 'Enter employee salary',
				}, {
					name: 'manager',
					type: 'list',
					message: 'Select Manager',
					choices: function () {
						// console.log(results[2]);
						let managers = results[2].map(manager => manager.full_name);
						return managers;
					}
				}
			]).then(function (answer) {
				const getRoleId = 'SELECT id FROM roles WHERE title = ' + "'" + answer.role + "'";
				const getManager = 'SELECT id FROM employees WHERE CONCAT (first_name," ",last_name) = ' + "'" + answer.manager + "'";
				connection.query(getRoleId, function(err, res) {
					if (err) throw err;
						const roleId = res[0].id;
						console.log(roleId)
						connection.query(getManager, function(err, res) {
							if (err) throw err;
								const managerId = res[0].id;
								const empSql = 'INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('+"'"+answer.firstName+"'" + ',' +"'"+answer.lastName+"'" + ',' + roleId + ',' + managerId +')';
								connection.query(empSql, function(err, res) {
									if (err) throw err;
								});
						});
				});
			runCMS();
			});
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
				case 'exit':
					connection.end();
					break;
				default:
					return

			}
		});
}

connection.connect(function(err) {
	if (err) throw err;
	// run the start function after the connection is made to prompt the user
	runCMS();;
});
