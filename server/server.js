// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

app.put('/save-content',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  (req, res) => {
    const { fullName, title, dateTime, body, uploadTime } = req.body;
    let imagePath = null;
    let videoPath = null;

    if (req.files && req.files.image && req.files.image.length > 0) {
      imagePath =  req.files.image[0].originalname;
    }
    if (req.files && req.files.video && req.files.video.length > 0) {
      videoPath =  req.files.video[0].originalname;
    }

    const insertQuery =
      'INSERT INTO content (imagePath, videoPath, fullName, title, dateTime, body, uploadTime) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [imagePath, videoPath, fullName, title, dateTime, body, uploadTime];

    connection.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ message: 'Error saving content', error: error.message });
        return;
      }
      console.log('Content saved successfully:', results);
      res.status(200).json({ message: 'Content saved successfully!' });
    });
  }
);

app.post('/update-content', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]), (req, res) => {
  const { id, fullName, title, dateTime, body, uploadTime } = req.body;
  let imagePath = null;
  let videoPath = null;

  if (req.files && req.files.image && req.files.image.length > 0) {
    imagePath = req.files.image[0].originalname;
  }
  if (req.files && req.files.video && req.files.video.length > 0) {
    videoPath = req.files.video[0].originalname;
  }

  const updateQuery = `UPDATE content 
                       SET imagePath = COALESCE(?, imagePath), 
                           videoPath = COALESCE(?, videoPath),
                           fullName = ?, 
                           title = ?, 
                           dateTime = ?, 
                           body = ?, 
                           uploadTime = ?
                       WHERE id = ?`;
  const values = [imagePath, videoPath, fullName, title, dateTime, body, uploadTime, id];

  connection.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error updating content:', error);
      res.status(500).json({ message: 'Error updating content', error: error.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }

    console.log(`Content with ID ${id} updated successfully`);
    res.status(200).json({ message: 'Content updated successfully!', imagePath, videoPath });
  });
});

app.delete('/delete-content/:id', (req, res) => {
  const contentId = req.params.id;

  const deleteQuery = 'DELETE FROM content WHERE id = ?';

  connection.query(deleteQuery, [contentId], (error, results) => {
    if (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({ message: 'Error deleting content', error: error.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }

    console.log(`Content with ID ${contentId} deleted successfully`);
    res.status(200).json({ message: 'Content deleted successfully' });
  });
});

app.get('/get-content', (req, res) => {
  const selectQuery =
    'SELECT id, imagePath, videoPath, fullName, title, DATE_FORMAT(dateTime, "%Y-%m-%d") as dateTime, body, uploadTime FROM content';
  connection.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({ message: 'Error fetching content', error: error.message });
      return;
    }

    const fullUrl = `${req.protocol}://${req.get('host')}`;
    const contentWithFullUrls = results.map(item => ({
      ...item,
      imagePath: item.imagePath ? `${fullUrl}/uploads/${item.imagePath}` : null,
      videoPath: item.videoPath ? `${fullUrl}/uploads/${item.videoPath}` : null,
    }));

    console.log('Content fetched successfully:', contentWithFullUrls);
    res.status(200).json(contentWithFullUrls);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});