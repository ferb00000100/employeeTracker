// SELECT o.OrderID, o.OrderDate, c.CustomerName
// FROM Customers AS c, Orders AS o
// WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;


const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "emptracker"
});

// const mQuery = 'SELECT r.title, d.department_name FROM roles AS r, departments AS d WHERE r.title'
const mQuery = 'SELECT r.title, d.department_name FROM roles AS r, departments AS d';
// const roleQuery = 'SELECT * from roles; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management"'

connection.query(rQuery, (err, results) => {
	if (err) throw err;
	// const role = results.map(roles => roles.title);
	// const department = results.map(departments => departments.department_name);
	const role = results.map(roles => roles.title);
	// console.log(results[0].title);
	// console.log(department);
console.log(role);
	connection.end();
});
