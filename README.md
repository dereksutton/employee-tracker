# Employee Tracker

![MIT](https://img.shields.io/badge/license/license-MIT-blue.svg)
[MIT](https://opensource.org/licenses/MIT)

## Description
This is an employee tracker application that allows you to manage your company's employee records. The application is built using Node.js, MySQL, and Inquirer.

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Features](#Features)
* [Dependencies](#Dependencies)
* [Contributors](#Contributors)
* [Schema](#Schema)
* [Contact](#Contact)

## Installation
To install the application, first clone the repository to your local machine. Next, navigate to the project directory. Once inside the project directory, run the command `npm install` to install the needed dependencies. Next, create a .env file in the project's directory, and input your MySQL connection details as follows:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=employee_tracker_db

Lastly, in MySQL Workbench or another MySQL client, please execute the `schema.sql` file in order to create the database, and then execute the `seeds.sql` file to populate the database with sample data.

## Usage
To run the application, navigate to the project directory in your terminal and run the command `node index.js`. You will then be prompted with questions in the command-line regarding which action you want to make with the database. You can view, add, update, and/or delete departments, roles, and employees. 

## Features
* User can interact with the application to view departments, roles, and employees.
* User can add new departments, roles, and employees, as needed.
* User can update employee roles, as needed.

## Dependencies
The following Node.js packages are the needed dependencies for this application:

* [mysql2](https://www.npmjs.com/package/mysql2)
* [inquirer](https://www.npmjs.com/package/inquirer)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [console.table](https://www.npmjs.com/package/console.table)

## Schema
The application's database schema consists of three tables:

1. `department`:
    * `id`: Integer, primary key, auto-increment
    * `name`: String, unique
2. `role`:
    * `id`: Integer, primary key, auto-increment
    * `title`: String, unique
    * `salary`: Decimal
    * `department_id`: Integer, foreign key referencing `department.id`
3. `employee`:
    * `id`: Integer, primary key, auto-increment
    * `first_name`: String
    * `last_name`: String
    * `role_id`: Integer, foreign key referencing `role.id`
    * `manager_id`: Integer, foreign key referencing `employee.id`, nullable value

## Contributors
* Project instruction provided by Georgia Tech Coding Bootcamp
* Application built by [Derek Sutton](https://github.com/dereksutton)
* Resource used to better understand MySQL: [Resource](https://www.udemy.com/course/mysql-bootcamp/)
* Resource used to better understand database interaction with Node.js: [Resource](https://www.udemy.com/course/nodejs-the-complete-guide/)

## Contact
Built by [github/dereksutton](https://github.com/dereksutton). You can email me [here](mailto:dereksutton86@gmail.com).
