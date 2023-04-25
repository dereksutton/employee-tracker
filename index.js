// Import necessary modules
const connection = require('./config/connection');
const inquirer = require('inquirer');
const { viewDepartments,
        viewRoles,
        viewEmployees,
        addDepartment, 
        addRole, 
        addEmployee, 
        updateEmployeeRole 
    } = require('./lib/queries');

// Connection to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Database successfully connected.');
    appStart();
});

// Main application loop when invoked
async function appStart() {
    try {
      // Prompt user for actions  
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
      // Execute the action based on user's choice
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
            // Prompt user for the new department name
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the new department name:',
                    validate: (input) => (input ? true : 'New department name is required.'),
                },
            ]);
            // Add the new department to the database
            await addDepartment(departmentName);
            break;

        case 'Add a role':
            // First display the available departments and their respective ID's
            console.log("Available Departments:");
            await viewDepartments();

            // Prompt user for new role details
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
            // Add the new role to the database
            await addRole(roleName, salary, departmentId);
            break;

        case 'Add an employee':
            //Display the available roles and their respective IDs
            console.log("Available Roles:");
            await viewRoles();
            
            // Prompt user for new employee details
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
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the Manager ID for the employee (leave blank if no manager):',
                    validate: (input) => {
                        if (input === '' || !isNaN(parseInt(input))) {
                            return true;
                        } else {
                            return 'Please enter a valid Manager ID or leave it blank.';
                        }
                    },
                },
            ]);
            // Add the new employee to the database
            await addEmployee(firstName, lastName, roleId, managerId ? parseInt(managerId) : null);
            break;

        case 'Update an employee role':
            // Prompt user for employee ID and new role ID
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
            // Update the employee role in the database
            await updateEmployeeRole(employeeId, newRoleId);
            break;

        case 'Exit':
          // Exit the application
          console.log('See ya later!');
          process.exit(0);
      }
    // Restart main loop if the user doesn't choose to exit
    if (action !== 'Exit') {
        appStart();
    }  

    } catch (error) {
      // Log any errors and exit the application
      console.error(error);
      process.exit(1);
    }
  }