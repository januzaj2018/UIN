const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

let data = {};

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Load the CSV data into memory
fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        const { ID, Section } = row;
        data[ID] = Section;
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

// Endpoint to look up the section by ID
app.post('/lookup', (req, res) => {
    const id = req.body.id;
    const section = data[id];
    if (section) {
        res.json({ section });
    } else {
        res.status(404).json({ error: 'ID not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
