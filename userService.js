// userService.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db');

exports.registerUser = (userData, callback) => {
    const { name, email, password, phone, address } = userData;

    const insertQuery = `
        INSERT INTO Users (name, email, password, phone, address)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [name, email, password, phone, address], function(err) {
        if (err) {
            console.error('Error:', err);
            callback(err);
        } else {
            console.log('User data added to database with ID:', this.lastID);
            callback(null, { message: 'User registered successfully' });
        }
    });
};

exports.getUsers = (callback) => {
    const selectQuery = `
        SELECT id, name, email, phone, address
        FROM Users
    `;

    db.all(selectQuery, [], (err, rows) => {
        if (err) {
            console.error('Error:', err);
            callback(err);
        } else {
            console.log('Users data:', rows);
            callback(null, rows);
        }
    });
};

exports.updateUser = (id, userData, callback) => {
    const { name, email, password, phone, address } = userData;

    const updateQuery = `
        UPDATE Users
        SET name = ?, email = ?, password = ?, phone = ?, address = ?
        WHERE id = ?
    `;

    db.run(updateQuery, [name, email, password, phone, address, id], function(err) {
        if (err) {
            console.error('Error:', err);
            callback(err);
        } else {
            console.log('User data updated with ID:', id);
            callback(null, { message: 'User data updated successfully' });
        }
    });
};

exports.deleteUser = (id, callback) => {
    const deleteQuery = `
        DELETE FROM Users
        WHERE id = ?
    `;

    db.run(deleteQuery, [id], function(err) {
        if (err) {
            console.error('Error:', err);
            callback(err);
        } else {
            console.log('User data deleted with ID:', id);
            callback(null, { message: 'User data deleted successfully' });
        }
    });
};
