const connection = require('./config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { viewDepartments,
        viewRoles,
        viewEmployees,
        addDepartment, 
        addRole, 
        addEmployee, 
        updateEmployeeRole 
    } = require('./lib/queries');


connection.connect((err) => {
    if (err) throw err;
    console.log('Database successfully connected.');
    appStart();
});

async function appStart() {
    try {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ]);
  
      switch (action) {
        case 'View all departments':
          await viewDepartments();
          break;

        case 'View all roles':
          await viewRoles();
          break;

        case 'View all employees':
          await viewEmployees();
          break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the new department name:',
                    validate: (input) => (input ? true : 'New department name is required.'),
                },
            ]);
            await addDepartment(departmentName);
            break;

        case 'Add a role':
            const { roleName, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the name of the new role:',
                    validate: (input) => (input ? true : 'New role name is required.'),
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter the salary for the new role:',
                    validate: (input) => (input ? true : 'Salary specification is required.'),
                },
                {
                    type: 'number',
                    name: 'departmentId',
                    message: 'Enter the Department ID for the new role:',
                    validate: (input) => (input ? true : 'Department ID for the new role is required.'),
                },
            ]);
            await addRole(roleName, salary, departmentId);
            break;

        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter first name of the employee:',
                    validate: (input) => (input ? true : 'Employee first name is required.'),
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter last name of the employee:',
                    validate: (input) => (input ? true : 'Employee last name is required.'),
                },
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'Enter the role ID for the employee:',
                    validate: (input) => (input ? true : 'An employee role ID is required.'),
                },
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'Enter the Manager ID for the employee:',
                    validate: (input) => {
                        if (input === '' || !isNaN(input)) {
                            return true;
                        } else {
                            return 'Please enter a valid Manager ID or leave it blank.';
                        }
                    },
                },
            ]);
            await addEmployee(firstName, lastName, roleId, managerId || null);
            break;

        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeId',
                    message: 'Enter the Employee ID of the employee you want to update:',
                    validate: (input) => (input ? true : 'An Employee ID is required.'),
                },
                {
                    type: 'number',
                    name: 'newRoleId',
                    message: 'Enter the New Role ID for the employee:',
                    validate: (input) => (input ? true : 'New Role ID is required.'),
                },
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            break;

        case 'Exit':
          console.log('See ya later!');
          process.exit(0);
      }

    if (action !== 'Exit') {
        appStart();
    }  

    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }