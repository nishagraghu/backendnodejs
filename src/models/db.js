const mysql = require("mysql");
const dbConfig = require('../config/db.config');

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
connection.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected Database");
});

module.exports = connection;