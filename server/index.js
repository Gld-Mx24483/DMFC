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

// app.use("/", (req,res) => {
//   res.send("Server is running.");
// });

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
// app.use(cors({
//   origin: 'http://localhost:3000' 
// }));

// app.use(cors({
//   origin: 'https://dmfc.vercel.app' // or ['https://dmfc.vercel.app', 'http://localhost:3000'] for local development
// }));


// const port = process.env.PORT || 9000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const path = require('path');
const contentManagementAPI = require('./content-management-api');
const eventManagementAPI = require('./event-management-api');
const galleryAPI = require('./gallery-api');
const volunteerAPI = require('./volunteer-api');
const teamAPI = require('./team-api');
const contactAPI = require('./contact-api');

const app = express();

const corsOptions = {
  origin: ['https://dmfc.vercel.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware at the root level

app.use("/", (req, res) => {
  res.send("Server is running.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', contentManagementAPI);
app.use('/', eventManagementAPI);
app.use('/', galleryAPI);
app.use('/', volunteerAPI);
app.use('/', teamAPI); // No need to pass corsOptions here
app.use('/', contactAPI);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});