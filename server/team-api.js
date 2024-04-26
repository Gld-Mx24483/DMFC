// // team-api.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql');

// const router = express.Router();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
//   console.log('Team Connected to MySQL database');
// });

// // router.put('/submit-team-form', (req, res) => {
//   router.put('/submit-team-form', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://dmfc.vercel.app'); // Replace with your deployed front-end URL
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   }, (req, res) => {
//     const { fullName, address, phoneNumber, email, role } = req.body;
  
//     const query = 'INSERT INTO team (fullName, address, phoneNumber, email, role, status) VALUES (?, ?, ?, ?, ?, ?)';
//     connection.query(query, [fullName, address, phoneNumber, email, role, 'pending'], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error submitting form' });
//       } else {
//         const insertedId = results.insertId;
//         res.status(200).json({ message: 'Form submitted successfully', insertedId });
//       }
//     });
//   });

//   // Update user status to 'accepted'
// // router.post('/accept-request/:id', (req, res) => {
//   router.post('/accept-request/:id', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://dmfc.vercel.app'); // Replace with your deployed front-end URL
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   }, (req, res) => {
//     const userId = req.params.id;
  
//     if (!userId || isNaN(userId)) {
//       res.status(400).json({ error: 'Invalid user ID' });
//       return;
//     }
  
//     const query = 'UPDATE team SET status = "accepted" WHERE id = ?';
//     connection.query(query, [userId], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error accepting request' });
//       } else {
//         res.status(200).json({ message: 'Request accepted successfully' });
//       }
//     });
//   });

// // Get all team members based on status
// router.get('/get-team-members', (req, res) => {
//   const status = req.query.status;
//   const email = req.query.email;
//   let query = 'SELECT id, fullName, email, address, phoneNumber, role, createdAt FROM team';
//   let whereClause = '';

//   if (status === 'pending') {
//     whereClause = ' WHERE status = "pending"';
//   } else if (status === 'accepted') {
//     whereClause = ' WHERE status = "accepted"';
//   }

//   if (email) {
//     if (whereClause) {
//       whereClause += ` AND email = '${email}'`;
//     } else {
//       whereClause = ` WHERE email = '${email}'`;
//     }
//   }

//   query += whereClause;

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing SQL query:', error);
//       res.status(500).json({ error: 'Error fetching team members' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

// // Delete a team member
// router.delete('/delete-team-member/:id', (req, res) => {
//     const userId = req.params.id;
  
//     if (!userId || isNaN(userId)) {
//       res.status(400).json({ error: 'Invalid user ID' });
//       return;
//     }
  
//     const query = 'DELETE FROM team WHERE id = ?';
//     connection.query(query, [userId], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error deleting team member' });
//       } else {
//         res.status(200).json({ message: 'Team member deleted successfully' });
//       }
//     });
//   });

//   // Delete a pending team member
// router.delete('/reject-request/:id', (req, res) => {
//   const userId = req.params.id;

//   if (!userId || isNaN(userId)) {
//     res.status(400).json({ error: 'Invalid user ID' });
//     return;
//   }

//   const query = 'DELETE FROM team WHERE id = ? AND status = "pending"';
//   connection.query(query, [userId], (error, results) => {
//     if (error) {
//       console.error('Error executing SQL query:', error);
//       res.status(500).json({ error: 'Error rejecting request' });
//     } else {
//       res.status(200).json({ message: 'Request rejected successfully' });
//     }
//   });
// });

// module.exports = router;

//team-api.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const pool = mysql.createPool({
//   host: 'bijx6x2fdwh3ntipeogx-mysql.services.clever-cloud.com',
//   user: 'uk1vlxqfb5xlnslo',
//   password: 'kNYqDHtRvssAOxhVNWOA',
//   database: 'bijx6x2fdwh3ntipeogx',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

const pool = mysql.createPool({
  host: 'bu119d598mxvdidbobkz-mysql.services.clever-cloud.com',
  user: 'uagrkuch76vflvej',
  password: 'TQsl2xm0U694WFB6Orh',
  database: 'bu119d598mxvdidbobkz',
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Team Connected to MySQL database');
});

router.put('/submit-team-form', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dmfc.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, (req, res) => {
  const { fullName, address, phoneNumber, email, role } = req.body;

  const query = 'INSERT INTO team (fullName, address, phoneNumber, email, role, status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [fullName, address, phoneNumber, email, role, 'pending'];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error submitting form' });
    } else {
      const insertedId = results.insertId;
      res.status(200).json({ message: 'Form submitted successfully', insertedId });
    }
  });
});

router.post('/accept-request/:id', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dmfc.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const query = 'UPDATE team SET status = "accepted" WHERE id = ?';
  const values = [userId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error accepting request' });
    } else {
      res.status(200).json({ message: 'Request accepted successfully' });
    }
  });
});

router.get('/get-team-members', (req, res) => {
  const status = req.query.status;
  const email = req.query.email;
  let query = 'SELECT id, fullName, email, address, phoneNumber, role, createdAt FROM team';
  let whereClause = '';

  if (status === 'pending') {
    whereClause = ' WHERE status = "pending"';
  } else if (status === 'accepted') {
    whereClause = ' WHERE status = "accepted"';
  }

  if (email) {
    if (whereClause) {
      whereClause += ` AND email = '${email}'`;
    } else {
      whereClause = ` WHERE email = '${email}'`;
    }
  }

  query += whereClause;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error fetching team members' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.delete('/delete-team-member/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const query = 'DELETE FROM team WHERE id = ?';
  const values = [userId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error deleting team member' });
    } else {
      res.status(200).json({ message: 'Team member deleted successfully' });
    }
  });
});

router.delete('/reject-request/:id', (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const query = 'DELETE FROM team WHERE id = ? AND status = "pending"';
  const values = [userId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error rejecting request' });
    } else {
      res.status(200).json({ message: 'Request rejected successfully' });
    }
  });
});

module.exports = router;