const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'sa',
    password: 'dockerStrongPwd123',
    database: 'StreamingDatabase',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
