let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let routes = require('./routes');

// Mongoose setup
if(process.env.NODE_ENV === 'production') {
  console.log('Server: Connecting to production DB');
  mongoose.connect('mongodb://admin:juh7hftA@ds117251.mlab.com:17251/simoti');
} else {
  console.log('Server: Connecting to local DB');
  mongoose.connect('mongodb://localhost/simoti');
}

mongoose.Promise = global.Promise;

// Express setup
var app = express();
app.set('trust proxy', true);
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
    console.error(`Server: Unable to start server on port [${port}]`);
  } else {
    console.log(`Server: Started on port ${port}`);
  }
});
