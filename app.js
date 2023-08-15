const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Excel = require('exceljs');


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

// POST API to add user data to Excel sheet
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
  
    const workbook = new Excel.Workbook();
    let sheet;
  
    // Check if the Excel file exists
    workbook.xlsx.readFile('users.xlsx')
      .then(() => {
        sheet = workbook.getWorksheet('Users');
      })
      .catch(() => {
        // If the file doesn't exist, create a new sheet with header
        sheet = workbook.addWorksheet('Users');
        sheet.addRow(['Name', 'Email', 'Password']); // Add header row
      })
      .then(() => {
        sheet.addRow([name, email, password]); // Add user data
  
        // Save the workbook to the file
        return workbook.xlsx.writeFile('users.xlsx');
      })
      .then(() => {
        console.log('User data added to Excel sheet');
        res.status(200).json({ message: 'User registered successfully' });
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Registration failed' });
      });
  });
  // GET API to read data from Excel sheet
app.get('/api/users', (req, res) => {
   // console.log('Users data req:', req);
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile('users.xlsx')
      .then(() => {
        const sheet = workbook.getWorksheet('Users');
        const usersData = [];
  
        sheet.eachRow((row, rowNumber) => {
            console.log("Inside Sheet- rowNumber", rowNumber);
          if (rowNumber !== 1) { // Skip header row
            const userData = {
              name: row.getCell(1).value,
              email: row.getCell(2).value,
              password: row.getCell(3).value,
            };
            usersData.push(userData);
          }
        });
        console.log('Users data:', usersData);
        res.status(200).json(usersData);
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error reading Excel sheet' });
      });
  });
  



app.listen(PORT, () => {
    console.log('Server is running on port#',PORT);
});
