// gallery-api.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const router = express.Router();
const app = express();

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

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Golden m@trix24483',
//     database: 'dmf_db'
//   });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Connected successfully")
})
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Gallery Connected to MySQL database');
  });
  
  // router.post('/upload-media', upload.single('media'), (req, res) => {
    router.post('/upload-media', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://dmfc.vercel.app'); // Replace with your deployed front-end URL
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    }, upload.single('media'), (req, res) => {
    const { title, date } = req.body;
    let imagePath = null;
    let videoPath = null;
  
    if (req.file) {
      if (req.file.mimetype.startsWith('image/')) {
        imagePath = req.file.originalname;
      } else if (req.file.mimetype.startsWith('video/')) {
        videoPath = req.file.originalname;
      }
    }
  
    const insertQuery = 'INSERT INTO gallery (title, imagePath, videoPath, upload_date) VALUES (?, ?, ?, ?)';
    const values = [title, imagePath, videoPath, date];
  
    connection.query(insertQuery, values, (error, results) => {
        if (error) {
          console.error('Error uploading media:', error);
          res.status(500).json({ message: 'Error uploading media', error: error.message });
          return;
        }
        console.log('Media uploaded successfully:', results);
        res.status(200).json({ message: 'Media uploaded successfully!', imagePath, videoPath });
      });
    });
    
    router.get('/get-media', (req, res) => {
      const selectQuery = 'SELECT id, title, imagePath, videoPath, upload_date FROM gallery';
      connection.query(selectQuery, (error, results) => {
        if (error) {
          console.error('Error fetching media:', error);
          res.status(500).json({ message: 'Error fetching media', error: error.message });
          return;
        }
    
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        const mediaWithFullUrls = results.map(item => ({
          ...item,
          imagePath: item.imagePath ? `${fullUrl}/uploads/${item.imagePath}` : null,
          videoPath: item.videoPath ? `${fullUrl}/uploads/${item.videoPath}` : null,
        }));
    
        console.log('Media fetched successfully:', mediaWithFullUrls);
        res.status(200).json(mediaWithFullUrls);
      });
    });
    
    router.delete('/delete-media/:id', (req, res) => {
      const mediaId = req.params.id;
    
      const deleteQuery = 'DELETE FROM gallery WHERE id = ?';
    
      connection.query(deleteQuery, [mediaId], (error, results) => {
        if (error) {
          console.error('Error deleting media:', error);
          res.status(500).json({ message: 'Error deleting media', error: error.message });
          return;
        }
    
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Media not found' });
          return;
        }
    
        console.log(`Media with ID ${mediaId} deleted successfully`);
        res.status(200).json({ message: 'Media deleted successfully' });
      });
    });
    
    // module.exports = router;

    module.exports = pool.promise()