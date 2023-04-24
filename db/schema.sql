-- Drop the 'employee_tracker_db' database if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;
-- Create a new 'employee_tracker_db' database
CREATE DATABASE employee_tracker_db;

-- Set the current database to 'employee_tracker_db'
USE employee_tracker_db;

-- Create a 'department' table with an auto-incrementing 'id' and a 'name' column
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create a 'role' table with an auto-incrementing 'id', 'title', 'salary', and 'department_id' columns
-- 'department_id' is a foreign key referencing the 'id' in the 'department' table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create an 'employee' table with auto-incrementing 'id', 'first_name', 'last_name', 'role_id', and 'manager_id' columns
-- 'role_id' is a foreign key referencing the 'id' in the 'role' table
-- 'manager_id' is a foreign key referencing the 'id' in the 'employee' table (self-referencing foreign key)
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);