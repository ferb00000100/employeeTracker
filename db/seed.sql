insert into departments(department_name)
values ('Management'),
       ('Engineering'),
       ('Sales'),
       ('Operations'),
       ('Human Resources');

insert into roles(title, salary, department_id) values('Manager', 221032, 1);
insert into roles(title, salary, department_id) values('Engineer', 32032, 2);
insert into roles(title, salary, department_id) values('Sales', 2032, 3);
insert into roles(title, salary, department_id) values('SOC', 1032, 4);
insert into roles(title, salary, department_id) values('Administration', 2212, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Jason", "Martin", 1, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Tom", "Brady", 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Alex", "Smith", 4, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Peter", "Pan", 3, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Captian", "Hook", 5, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Blues", "Clues", 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Tom", "Hanks", 3, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Bill", "Hicks", 1, 1 );
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("Dane", "Cook", 1, 1);
