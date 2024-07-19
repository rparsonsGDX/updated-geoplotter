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

// Middleware to parse JSON bodies
app.use(express.json());

// Get all data from locations
app.get('/locations', (req, res) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

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

// PUT endpoint to update data
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

// DELETE endpoint to reset data on map. NOTE: this will clear the database.
app.delete('/api/data', (req, res) => {
    db.run('DELETE FROM locations', [], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).send('All locations have been deleted');
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












