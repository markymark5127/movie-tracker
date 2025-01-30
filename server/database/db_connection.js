const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'dockerStrongPwd123',
    server: 'localhost',
    port: 1433,
    database: 'StreamingDatabase',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL successfully!');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};
