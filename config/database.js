const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_calendar', 'ksvengurl', 'supersecretadminpassword', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;

