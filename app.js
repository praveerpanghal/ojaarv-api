const express = require('express');
const app = express();
const cors = require('cors');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/contact', (req, res) => {
    res.send('Hello, Express Ojaarv!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
