const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

app.use(cors());

const initRoutes = require('./routes/index');

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});