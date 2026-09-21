const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// API GET
app.get('/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file:', err.message);
        res.json(JSON.parse(data));
    });
});

// API POST
app.post('/update', (req, res) => {
    const newData = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(newData, null, 4), (err) => {
        if (err) return res.status(500).send('Error writing file');
        res.json({ message: "The data has been updated" });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});