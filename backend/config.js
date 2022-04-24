const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '628495',
  database: 'restaurant-management-web-application',
  waitForConnections: true
})

module.exports = pool;