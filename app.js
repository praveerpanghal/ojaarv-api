const express = require('express');
const app = express();

app.get('/contact', (req, res) => {
    res.send('Hello, Express Ojaarv!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});