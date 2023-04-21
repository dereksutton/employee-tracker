USE employee_tracker_db;

INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('HR Manager', 125000, 1),
    ('Software Engineer', 190000, 2),
    ('Sales Manager', 150000, 3),
    ('Marketing Manager', 165000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Max', 'Thompson', 1, NULL),
    ('Ava', 'Anderson', 2, NULL),
    ('Jackson', 'Lee', 3, NULL),
    ('Harper', 'Williams', 4, NULL);