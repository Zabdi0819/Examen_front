const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('customer_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = sequelize;
