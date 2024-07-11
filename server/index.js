// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const galleryAPI = require('./gallery-api');
const teamAPI = require('./team-api');
const volunteerAPI = require('./volunteer-api');
const contactAPI = require('./contact-api');
const contentManagementAPI = require('./content-management-api');
const eventManagementAPI = require('./event-management-api');
const app = express();
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(bodyParser.json({ limit: '100000mb' }));
app.use(bodyParser.urlencoded({  limit: '100000mb', extended: true }));
app.use(express.json());

app.use("/", (req,res) => {
  res.send("Server is running fast.");
})
app.use('/', teamAPI);
app.use('/', galleryAPI);
app.use('/', contactAPI);
app.use('/', contentManagementAPI);
app.use('/', volunteerAPI);
app.use('/', eventManagementAPI);

app.use(cors({
  origin: 'https://dmfc.vercel.app'
}));

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});