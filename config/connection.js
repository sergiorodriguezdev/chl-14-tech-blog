// Import dotenv package and values from .env file into environment variables
require('dotenv').config();

// Import Sequelize package/class 
const Sequelize = require('sequelize');

// Create Sequelize instance/object
const sequelize = process.env.JAWSDB_URL    // This is required when deploying to Heroku and using the JawsDB product
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(    // Settings for local dev environment using MySQL
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );

    module.exports = sequelize;