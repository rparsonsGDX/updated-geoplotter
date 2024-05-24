const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const dbPath = path.resolve(__dirname, 'map_data.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.get('/locations', (req, res) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to add data
app.post('/api/data', (req, res) => {
    const { uuid, lat, lon, time, date, description } = req.body; // Assuming uuid, lat, lon, time, date, and description are your data fields
    db.run('INSERT INTO locations (uuid, lat, lon, time, date, description) VALUES (?, ?, ?, ?, ?, ?)', [uuid, lat, lon, time, date, description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// POST endpoint to update data
app.put('/api/data', (req, res) => {
    const { uuid, lat, lon, time, date, description } = req.body; // Assuming uuid, lat, lon, time, date, and description are your data fields
    db.run('INSERT INTO locations (uuid, lat, lon, time, date, description) VALUES (?, ?, ?, ?, ?, ?)', [uuid, lat, lon, time, date, description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












