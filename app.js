const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userService = require('./userService'); 


const PORT = process.env.PORT || 3000;
// Middleware

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// POST API to add user data to the database
app.post('/api/register', (req, res) => {
    const userData = req.body;

    userService.registerUser(userData, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.status(200).json(result);
        }
    });
});

// GET API to read data from the database
app.get('/api/users', (req, res) => {
    userService.getUsers((err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error reading user data' });
        } else {
            res.status(200).json(data);
        }
    });
});

// PUT API to update user data in the database
app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    userService.updateUser(id, userData, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Update failed' });
        } else {
            res.status(200).json(result);
        }
    });
});

// DELETE API to delete user data from the database
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;

    userService.deleteUser(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Delete failed' });
        } else {
            res.status(200).json(result);
        }
    });
});


app.listen(PORT, () => {
    console.log('Server is running on port#',PORT);
});
