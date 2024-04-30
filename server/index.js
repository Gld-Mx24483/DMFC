// // index.js
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const contentManagementAPI = require('./content-management-api');
// const eventManagementAPI = require('./event-management-api');
// const galleryAPI = require('./gallery-api');
// const volunteerAPI = require('./volunteer-api');
// const teamAPI = require('./team-api');
// const contactAPI = require('./contact-api');

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/', contentManagementAPI);
// app.use('/', eventManagementAPI);
// app.use('/', galleryAPI);
// app.use('/', volunteerAPI);
// app.use('/', teamAPI);
// app.use('/', contactAPI);
// // app.use(cors({
// //   origin: 'http://localhost:3000' 
// // }));
// app.use(cors({
//   origin: 'https://dmfc.vercel.app' // Replace with your deployed front-end URL
// }));
// app.use("/", (req,res) => {
//   res.send("Server is running.");
// })


// const port = process.env.PORT || 9000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // server.js
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const galleryAPI = require('./gallery-api');
// const teamAPI = require('./team-api');
// const volunteerAPI = require('./volunteer-api');
// const contactAPI = require('./contact-api');
// const contentManagementAPI = require('./content-management-api');
// const eventManagementAPI = require('./event-management-api');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/', teamAPI);
// app.use('/', galleryAPI);
// app.use('/', contactAPI);
// app.use('/', contentManagementAPI);
// app.use('/', volunteerAPI);
// app.use('/', eventManagementAPI);
// app.use("/", (req,res) => {
//   res.send("Server is running.");
// })
// app.use(cors({
//   origin: 'https://dmfc.vercel.app' 
// }));

// // app.use(cors({
// //   origin: 'http://localhost:9000' 
// // }));

// const port = process.env.PORT || 9000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


//index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const galleryAPI = require('./gallery-api');
const teamAPI = require('./team-api');
const volunteerAPI = require('./volunteer-api');
const contactAPI = require('./contact-api');
const contentManagementAPI = require('./content-management-api');
const eventManagementAPI = require('./event-management-api');

const app = express();

const MAX_PAYLOAD_SIZE = '200mb'; // Set the maximum payload size to 50 MB, adjust as needed

app.use(cors({
  origin: 'https://dmfc.vercel.app', // Allow requests from this origin
}));
app.use(express.json({ limit: MAX_PAYLOAD_SIZE }));
app.use(express.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true }));
app.use(bodyParser.json({ limit: MAX_PAYLOAD_SIZE }));
app.use(bodyParser.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true }));

// Mount your API routes
app.use('/', teamAPI);
app.use('/', galleryAPI);
app.use('/', contactAPI);
app.use('/', contentManagementAPI);
app.use('/', volunteerAPI);
app.use('/', eventManagementAPI);

// Default route to indicate server is running
app.use("/", (req, res) => {
  res.send("Server is running.");
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
