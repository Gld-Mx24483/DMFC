// // contact-api.js
// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');

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
//   console.log('Connected to MySQL database');
// });

// router.post('/submit-contact-form', (req, res) => {
//   const { name, email, phone, message } = req.body;

//   const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
//   connection.query(query, [name, email, phone, message], (error, results) => {
//     if (error) {
//       console.error('Error executing SQL query:', error);
//       res.status(500).json({ error: 'Error submitting form' });
//     } else {
//       res.status(200).json({ message: 'Form submitted successfully' });
//     }
//   });
// });

// router.post('/save-admin-response', (req, res) => {
//     const { userMessageId, userEmail, adminResponse } = req.body;
  
//     const query = 'INSERT INTO admin_user_messages (user_message_id, user_email, admin_message) VALUES (?, ?, ?)';
//     connection.query(query, [userMessageId, userEmail, adminResponse], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error saving admin response' });
//       } else {
//         res.status(200).json({ message: 'Admin response saved successfully' });
//       }
//     });
//   });

//   router.post('/submit-admin-broadcast', (req, res) => {
//     const { message } = req.body;
  
//     const query = 'INSERT INTO admin_broadcast_messages (message) VALUES (?)';
//     connection.query(query, [message], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error submitting broadcast message' });
//       } else {
//         res.status(200).json({ message: 'Broadcast message submitted successfully' });
//       }
//     });
//   });

// router.get('/get-contact-messages', (req, res) => {
//     const query = 'SELECT id, name, email, phone, message, created_at FROM contacts';
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error fetching contact messages' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });

//   router.get('/get-admin-reply', (req, res) => {
//     const userEmail = req.query.email;
  
//     const query = 'SELECT admin_message FROM admin_user_messages WHERE user_email = ? ORDER BY created_at DESC LIMIT 1';
//     connection.query(query, [userEmail], (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error fetching admin reply' });
//       } else {
//         if (results.length > 0) {
//           res.status(200).json({ adminReply: results[0].admin_message });
//         } else {
//           res.status(200).json({ adminReply: 'No reply found for the given email' });
//         }
//       }
//     });
//   });

//   router.get('/get-user-messages-with-admin-responses', (req, res) => {
//     const query = `
//       SELECT c.id, c.name, c.email, c.message, c.created_at, aum.admin_message
//       FROM contacts c
//       LEFT JOIN admin_user_messages aum ON c.id = aum.user_message_id
//       ORDER BY c.created_at DESC
//     `;
  
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error fetching user messages' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });

//   router.get('/get-admin-broadcast-messages', (req, res) => {
//     const query = 'SELECT id, message, created_at FROM admin_broadcast_messages ORDER BY created_at DESC';
//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing SQL query:', error);
//         res.status(500).json({ error: 'Error fetching broadcast messages' });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });

// module.exports = router;

//contact-api.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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
  waitForConnections: true,
  connectionLimit: 125,
  queueLimit: 0
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Contact Connected to MySQL database');
});

router.post('/submit-contact-form', (req, res) => {
  const { name, email, phone, message } = req.body;

  const query = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
  const values = [name, email, phone, message];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error submitting form' });
    } else {
      res.status(200).json({ message: 'Form submitted successfully' });
    }
  });
});

router.post('/save-admin-response', (req, res) => {
  const { userMessageId, userEmail, adminResponse } = req.body;

  const query = 'INSERT INTO admin_user_messages (user_message_id, user_email, admin_message) VALUES (?, ?, ?)';
  const values = [userMessageId, userEmail, adminResponse];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error saving admin response' });
    } else {
      res.status(200).json({ message: 'Admin response saved successfully' });
    }
  });
});

router.post('/submit-admin-broadcast', (req, res) => {
  const { message } = req.body;

  const query = 'INSERT INTO admin_broadcast_messages (message) VALUES (?)';
  const values = [message];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error submitting broadcast message' });
    } else {
      res.status(200).json({ message: 'Broadcast message submitted successfully' });
    }
  });
});

router.get('/get-contact-messages', (req, res) => {
  const query = 'SELECT id, name, email, phone, message, created_at FROM contacts';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error fetching contact messages' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/get-admin-reply', (req, res) => {
  const userEmail = req.query.email;

  const query = 'SELECT admin_message FROM admin_user_messages WHERE user_email = ? ORDER BY created_at DESC LIMIT 1';
  const values = [userEmail];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error fetching admin reply' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ adminReply: results[0].admin_message });
      } else {
        res.status(200).json({ adminReply: 'No reply found for the given email' });
      }
    }
  });
});

router.get('/get-user-messages-with-admin-responses', (req, res) => {
  const query = `
    SELECT c.id, c.name, c.email, c.message, c.created_at, aum.admin_message
    FROM contacts c
    LEFT JOIN admin_user_messages aum ON c.id = aum.user_message_id
    ORDER BY c.created_at DESC
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error fetching user messages' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get('/get-admin-broadcast-messages', (req, res) => {
  const query = 'SELECT id, message, created_at FROM admin_broadcast_messages ORDER BY created_at DESC';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Error fetching broadcast messages' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;