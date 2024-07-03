const mysql = require ('mysql2')

const pool =mysql.createPool({
    host:'sql10.freesqldatabase.com',
    user: 'sql10717155',
    password: '3xLq8EX4nv',
    database: 'sql10717155',
    port: 3306,
    waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0,
})

module.exports = {
	conn: pool.promise()
}