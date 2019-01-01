const mysql = require('mysql2');

const pool = mysql.createPool({
	database: 'node_complete',
	host: 'localhost',
	password: '123456',
	user: 'root',
});

module.exports = pool.promise();
