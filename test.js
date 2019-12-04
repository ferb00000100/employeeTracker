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