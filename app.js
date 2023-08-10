const express = require('express');
const app = express();
const cors = require('cors');

const allowedOrigins = ['http://127.0.0.1:5500/', 'https://ojaarv-api.onrender.com/'];
app.use(cors({
    origin: allowedOrigins
}));
app.get('/contact', (req, res) => {
    res.send('Hello, Express Ojaarv!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
