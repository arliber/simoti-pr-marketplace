let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let routes = require('./routes');

// Mongoose setup
 mongoose.connect('mongodb://localhost/simoti');
// mongoose.connect('mongodb://admin:juh7hftA@ds117251.mlab.com:17251/simoti');
mongoose.Promise = global.Promise;

// Express setup
var app = express(); // Create a new instance of the server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(__dirname + '/../dist'));

// Routes
app.use(routes);


// Handle errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'invalid token'});
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function (err){
  if (err) {
    console.log('Error: Unable to start server on port ', port);
  } else {
    console.log('Running server on port ', port);
  }
});
