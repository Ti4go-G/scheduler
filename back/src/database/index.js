const { Sequelize } = require('sequelize');
const dbconfig = require('../config/database');

const connection = new Sequelize(dbconfig);

try {
    connection.authenticate();
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = connection;