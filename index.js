const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const morgan = require("morgan");
const jwt = require("jwt-simple");
const db = require("./models");

const keys = require("./config/keys");
const PORT = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(function (req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[1] !== 'null') {
    id = jwt.decode(req.headers.authorization.split(' ')[1], keys.sessionSecret).userid;
    db.User.findOne({_id: id})
      .then((user) => {
        req.user = user
        next();
      })
  } else {
    next();
  }
});

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

