// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const contentManagementAPI = require('./content-management-api');
const eventManagementAPI = require('./event-management-api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', contentManagementAPI);
app.use('/', eventManagementAPI);

// set port, listen for requests

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
