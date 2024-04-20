const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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
  console.log('Connected to MySQL database');
});

router.post('/submit-contact-form', (req, res) => {
  const { name, email, phone, message } = req.body;

  const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, phone, message], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error submitting form' });
    } else {
      res.status(200).json({ message: 'Form submitted successfully' });
    }
  });
});

// contactAPI.js
// router.get('/get-contact-messages', (req, res) => {
//     const query = 'SELECT name, email, phone, message, created_at FROM contacts';
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error fetching contact messages' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });
// contactAPI.js
router.get('/get-contact-messages', (req, res) => {
    const query = 'SELECT id, name, email, phone, message, created_at FROM contacts';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Error fetching contact messages' });
      } else {
        res.status(200).json(results);
      }
    });
  });

module.exports = router;