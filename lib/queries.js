const connection = require('../config/connection');

// Function to view all departments
function viewDepartments() {
    const query = 'SELECT * FROM department';
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            resolve();
        });
    });
}

// Function to view all roles
function viewRoles() {
    const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            resolve();
        });  
    });
}

// Function to view all employees
function viewEmployees() {
    const query = `
    SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            resolve();
        });
    }); 
}

// Function to add a new department
function addDepartment(name) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [name], (err, res) => {
            if (err) throw err;
            console.log('Department added successfully.');
            resolve();
        });
    });
}

// Function to add a new role
function addRole(title, salary, department_id) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [title, salary, department_id], (err, res) => {
            if (err) throw err;
            console.log('Role added successfully.');
            resolve();
        });
    });
}

// Function to add a new employee
function addEmployee(first_name, last_name, role_id, manager_id) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [first_name, last_name, role_id, manager_id], (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully.');
            resolve();
        });
    });
}

// Function to update an employee's role
function updateEmployeeRole(employee_id, role_id) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [role_id, employee_id], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated successfully.');
            resolve();
        });
    });
}

// Export functions
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};