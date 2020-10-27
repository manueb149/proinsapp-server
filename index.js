global.__basedir = __dirname;

const express = require("express");
const cors = require("cors");

const App = express();
const port = process.env.PORT || 8080;

App.use(cors());
App.use(express.json({extended: true}));

App.use('/api', require('./routes/index'));

App.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});