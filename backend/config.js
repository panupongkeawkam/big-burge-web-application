const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '63070132',
  database: 'restaurant-management-web-application',
  waitForConnections: true
})

module.exports = pool;