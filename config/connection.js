 var Sequelize = require('sequelize'), connection;

if (process.env.JAWSDB_URL) {
  connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  connection = new Sequelize('burgers_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3000'
  })
};

module.exports = connection;