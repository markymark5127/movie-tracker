// Express.js Backend for SQL Server
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// SQL Server Config
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Connect to SQL Server
sql.connect(dbConfig).then(() => {
    console.log('Connected to SQL Server');
}).catch(err => console.error('Database connection failed:', err));

// Get all movies
app.get('/movies', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Movies`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get movies by streaming service
app.get('/movies/:serviceID', async (req, res) => {
    try {
        const { serviceID } = req.params;
        const result = await sql.query`SELECT * FROM Movies WHERE StreamingServiceID = ${serviceID}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a movie
app.post('/movies', async (req, res) => {
    try {
        const { title, description, releaseYear, streamingServiceID } = req.body;
        await sql.query`INSERT INTO Movies (Title, Description, ReleaseYear, StreamingServiceID) VALUES (${title}, ${description}, ${releaseYear}, ${streamingServiceID})`;
        res.json({ message: 'Movie added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all streaming services
app.get('/streaming-services', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM StreamingServices`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Angular Frontend UI Components
const { exec } = require('child_process');
exec('npx ng g c components/movie-list', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error creating movie-list component: ${err.message}`);
        return;
    }
    console.log(stdout);
});

exec('npx ng g c components/movie-details', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error creating movie-details component: ${err.message}`);
        return;
    }
    console.log(stdout);
});

exec('npx ng g c components/streaming-toggle', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error creating streaming-toggle component: ${err.message}`);
        return;
    }
    console.log(stdout);
});

