const db= require('./db');
const express = require('express');
const cors = require('cors');    
const app = express();  
const port = 5000;  
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
})
app.get('/api/contacts', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving contacts');
        } else {
            res.json(results);
        }
    });
});