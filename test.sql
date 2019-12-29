

SELECT *
FROM roles;


SELECT CONCAT (e.first_name," ",e.last_name) AS full_name,
    r.title,
    d.department_name
FROM employees e
INNER JOIN roles r ON r.id = e.role_id
INNER JOIN departments d ON d.id = r.department_id
WHERE department_name = "Management";
