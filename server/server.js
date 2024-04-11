// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 9000;

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
  console.log('Connected to MySQL database');
});

app.put('/save-content', (req, res) => {
    const { imageSrc, videoSrc, fullName, title, dateTime, body, uploadTime } = req.body;
    const insertQuery = 'INSERT INTO content (imageSrc, videoSrc, fullName, title, dateTime, body, uploadTime) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [imageSrc, videoSrc, fullName, title, dateTime, body, uploadTime];
  
    console.log('Received form data:', req.body); 
    console.log('Insert values:', values); 
  
    connection.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ message: 'Error saving content', error: error.message }); // Send detailed error message to client
        return;
      }
      console.log('Content saved successfully:', results);
      res.status(200).json({ message: 'Content saved successfully!' });
    });
  });

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

