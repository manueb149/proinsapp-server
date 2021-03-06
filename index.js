//Base directory of workspacce
global.__basedir = __dirname;

//Initialize libraries
const express = require("express");
const cors = require("cors");
const DBConnect = require('./config/db');

// Connect to database
DBConnect();

// Create express app and assign port
const App = express();
const PORT = process.env.PORT || 8080;

// Use cors and json
App.use(cors());
App.use(express.json({extended: true}));

// Route for files management
App.use('/api/files', require('./routes/file.route'));
App.use('/api/data', require('./routes/fileData.route'));
App.use('/api/trucks', require('./routes/truck.route'));
App.use('/api/trucksData', require('./routes/truckData.route'));
App.use('/api/service', require('./routes/service.route'));
App.use('/api/values', require('./routes/defaulValues.route'));
App.use('/api/user', require('./routes/user.route'));
App.use('/api/auth', require('./routes/auth.route'));

// jsreport init
const reportingApp = express();
App.use('/', reportingApp);

const jsreport = require('jsreport-core')();
jsreport.use(require('jsreport-templates')());
jsreport.use(require('jsreport-express')({ app: reportingApp }));

jsreport.init();

// Start express application
App.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});