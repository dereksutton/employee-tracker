// Import mysql2 package
const mysql = require('mysql2');
// Import dotenv package and configure it
require('dotenv').config();

// Create MySQL connection object using environment variables
const connection = mysql.createConnection({
    // Use values from the .env file and set the default values to fall back on if needed
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'employee_tracker_db',
});

// Export MySQL database connection object
module.exports = connection;