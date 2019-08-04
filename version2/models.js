const Sequelize = require('sequelize'); //ORM
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false 
});

// Model
const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = {Sequelize, sequelize, User};


