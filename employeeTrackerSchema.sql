DROP DATABASE IF EXISTS emptracker;
CREATE DATABASE emptracker;

USE emptracker;

create table employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    manager varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

create table department (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

create table role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal,
    department_id int NOT NULL,
--     foreign key (department_id) references employee (id) on delete cascade,
    PRIMARY KEY (id)
);

-- Example of adding index to column song
-- ALTER TABLE top5000 ADD index song;

-- Example INNER JOIN
-- mysql> SELECT * FROM top5000 INNER JOIN topAlbums USING (artist) where top5000.year = topAlbums.year AND artist like 'queen' AND album like 'the game';