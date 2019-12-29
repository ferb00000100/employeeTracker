DROP DATABASE IF EXISTS emptracker;
CREATE DATABASE emptracker;
USE emptracker;

create table departments (
    id int auto_increment,
    department_name varchar(30) not null,
    primary key(id)
);

create table roles (
    id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal,
    department_id int,
    foreign key (department_id) references departments(id) ON DELETE CASCADE
);

create table employees (
    id int auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    manager_id int,
    foreign key(role_id) references roles(id),
    foreign key(manager_id) references employees(id)
);
