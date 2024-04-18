// volunteer-api.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Golden m@trix24483',
  database: 'dmf_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Vlt Connected to MySQL database');
});

// Handle form submission
router.put('/submit-volunteer-form', (req, res) => {
  const { fullName, address, phoneNumber, email, volunteerFor } = req.body;

  const query = 'INSERT INTO volunteers (fullName, address, phoneNumber, email, volunteerFor) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [fullName, address, phoneNumber, email, volunteerFor], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error submitting form' });
    } else {
      res.status(200).json({ message: 'Form submitted successfully' });
    }
  });
});

module.exports = router;