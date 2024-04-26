// // event-management-api.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const mysql = require('mysql');

// const router = express.Router();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadsDir = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir);
//     }
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Golden m@trix24483',
//   database: 'dmf_db'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('EMS Connected to MySQL database');
// });

// router.put('/save-event', upload.single('image'), (req, res) => {
//     const { title, dateTime, location, description, brief, time } = req.body;
//     let imagePath = null;
  
//     if (req.file) {
//       imagePath = req.file.originalname;
//     }
  
//     const insertQuery =
//       'INSERT INTO events (title, dateTime, time, location, description, brief, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     const values = [title, dateTime, time, location, description, brief, imagePath];
  
//     connection.query(insertQuery, values, (error, results) => {
//       if (error) {
//         console.error('Error saving event:', error);
//         res.status(500).json({ message: 'Error saving event', error: error.message });
//         return;
//       }
//       console.log('Event saved successfully:', results);
//       res.status(200).json({ message: 'Event saved successfully!', id: results.insertId });
//     });
//   });
  
//   router.post('/update-event', upload.single('image'), (req, res) => {
//     const { id, title, dateTime, time, location, description, brief } = req.body;
//     let imagePath = null;
  
//     if (req.file) {
//       imagePath = req.file.originalname;
//     }
  
//     const updateQuery = `UPDATE events 
//                          SET title = ?, 
//                              dateTime = ?, 
//                              time = ?, 
//                              location = ?, 
//                              description = ?, 
//                              brief = ?, 
//                              imagePath = COALESCE(?, imagePath)
//                          WHERE id = ?`;
//     const values = [title, dateTime, time, location, description, brief, imagePath, id];
  
//     connection.query(updateQuery, values, (error, results) => {
//       if (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ message: 'Error updating event', error: error.message });
//         return;
//       }
  
//       if (results.affectedRows === 0) {
//         res.status(404).json({ message: 'Event not found' });
//         return;
//       }
  
//       console.log(`Event with ID ${id} updated successfully`);
//       res.status(200).json({ message: 'Event updated successfully!', imagePath });
//     });
//   });

// router.delete('/delete-event/:id', (req, res) => {
//   const eventId = req.params.id;

//   const deleteQuery = 'DELETE FROM events WHERE id = ?';

//   connection.query(deleteQuery, [eventId], (error, results) => {
//     if (error) {
//       console.error('Error deleting event:', error);
//       res.status(500).json({ message: 'Error deleting event', error: error.message });
//       return;
//     }

//     if (results.affectedRows === 0) {
//       res.status(404).json({ message: 'Event not found' });
//       return;
//     }

//     console.log(`Event with ID ${eventId} deleted successfully`);
//     res.status(200).json({ message: 'Event deleted successfully' });
//   });
// });

// router.get('/get-events', (req, res) => {
//   const selectQuery =
//     'SELECT id, title, dateTime, time, location, description, brief, imagePath FROM events';
//   connection.query(selectQuery, (error, results) => {
//     if (error) {
//       console.error('Error fetching events:', error);
//       res.status(500).json({ message: 'Error fetching events', error: error.message });
//       return;
//     }

//     const fullUrl = `${req.protocol}://${req.get('host')}`;
//     const eventsWithFullUrls = results.map(item => ({
//       ...item,
//       imagePath: item.imagePath ? `${fullUrl}/uploads/${item.imagePath}` : null,
//     }));

//     console.log('Events fetched successfully:', eventsWithFullUrls);
//     res.status(200).json(eventsWithFullUrls);
//   });
// });

// module.exports = router;


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

const pool = mysql.createPool({
  host: 'dmf-db.cd0i6o42e4on.ca-central-1.rds.amazonaws.com',
  user: 'admin',
  password: 'goldenmatrix24483',
  database: 'dmf_db',
  port: '3306',
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('EMS Connected to MySQL database');
});

router.put('/save-event', upload.single('image'), (req, res) => {
  const { title, dateTime, location, description, brief, time } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.originalname;
  }

  const insertQuery =
    'INSERT INTO events (title, dateTime, time, location, description, brief, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, dateTime, time, location, description, brief, imagePath];

  pool.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error('Error saving event:', error);
      res.status(500).json({ message: 'Error saving event', error: error.message });
      return;
    }
    console.log('Event saved successfully:', results);
    res.status(200).json({ message: 'Event saved successfully!', id: results.insertId });
  });
});

router.post('/update-event', upload.single('image'), (req, res) => {
  const { id, title, dateTime, time, location, description, brief } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.originalname;
  }

  const updateQuery = `UPDATE events 
                       SET title = ?, 
                           dateTime = ?, 
                           time = ?, 
                           location = ?, 
                           description = ?, 
                           brief = ?, 
                           imagePath = COALESCE(?, imagePath)
                       WHERE id = ?`;
  const values = [title, dateTime, time, location, description, brief, imagePath, id];

  pool.query(updateQuery, values, (error, results) => {
    if (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Error updating event', error: error.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    console.log(`Event with ID ${id} updated successfully`);
    res.status(200).json({ message: 'Event updated successfully!', imagePath });
  });
});

router.delete('/delete-event/:id', (req, res) => {
  const eventId = req.params.id;

  const deleteQuery = 'DELETE FROM events WHERE id = ?';

  pool.query(deleteQuery, [eventId], (error, results) => {
    if (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Error deleting event', error: error.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    console.log(`Event with ID ${eventId} deleted successfully`);
    res.status(200).json({ message: 'Event deleted successfully' });
  });
});

router.get('/get-events', (req, res) => {
  const selectQuery =
    'SELECT id, title, dateTime, time, location, description, brief, imagePath FROM events';
  pool.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Error fetching events', error: error.message });
      return;
    }

    const fullUrl = `${req.protocol}://${req.get('host')}`;
    const eventsWithFullUrls = results.map(item => ({
      ...item,
      imagePath: item.imagePath ? `${fullUrl}/uploads/${item.imagePath}` : null,
    }));

    console.log('Events fetched successfully:', eventsWithFullUrls);
    res.status(200).json(eventsWithFullUrls);
  });
});

module.exports = router;