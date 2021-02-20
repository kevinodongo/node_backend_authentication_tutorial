const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000)

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// use cors options
app.use(cors())

// redis connection
const client = require("./src/config/redis.config")
// catch redis error
client.on("error", function(error) {
  console.error(error);
});

// mongo db database connection
const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// routes
const users = require('./src/routes/users')
app.use('/api/user', users, function(req, res, next){
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

// catch all errors
const errorHandler = require("./src/middleware/errorhandler");
app.use(errorHandler)


module.exports = app