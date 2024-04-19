// team-api.js
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
  console.log('Team Connected to MySQL database');
});

router.put('/submit-team-form', (req, res) => {
    const { fullName, address, phoneNumber, email, role } = req.body;
  
    const query = 'INSERT INTO team (fullName, address, phoneNumber, email, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [fullName, address, phoneNumber, email, role], (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Error submitting form' });
      } else {
        const insertedId = results.insertId;
        res.status(200).json({ message: 'Form submitted successfully', insertedId });
      }
    });
  });

// Get all team members
router.get('/get-team-members', (req, res) => {
    const query = 'SELECT id, fullName, email, address, phoneNumber, role, createdAt FROM team';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Error fetching team members' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// Delete a team member
router.delete('/delete-team-member/:id', (req, res) => {
    const userId = req.params.id;
  
    if (!userId || isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
  
    const query = 'DELETE FROM team WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        res.status(500).json({ error: 'Error deleting team member' });
      } else {
        res.status(200).json({ message: 'Team member deleted successfully' });
      }
    });
  });

module.exports = router;
