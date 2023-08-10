const express = require('express');
const app = express();
const cors = require('cors');

const allowedOrigins = ['http://127.0.0.1:5500','https://ojaarv.com/'];
app.use(cors({
    origin: allowedOrigins
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigins);
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
