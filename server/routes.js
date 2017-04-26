const express = require('express');
const expressJwt = require('express-jwt');
const streamToPromise = require('stream-to-promise');
const multer = require('multer');
const Storage = require('@google-cloud/storage');
const config = require('./config');
const usersController = require('./controllers/users.controller.js');
const opportunitiesController = require('./controllers/opportunities.controller.js');

// JWT
const jwtCheck = expressJwt({
  secret: config.server.jwtSecret,
});

// File uploads
const upload = multer({
  /* dest: 'uploads/',*/
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const storage = Storage();
const bucket = storage.bucket('simoti');

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/simoti/${filename}`;
}

function sendUploadToGCS(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const timestamp = Date.now();
  let filesPromises = [];
  for (let i = 0; i < req.files.length; i += 1) {
    try {
      const gcsname = timestamp + req.files[i].originalname;
      const file = bucket.file(gcsname);
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.files[i].mimetype,
        },
      });
      stream.end(req.files[i].buffer);

      filesPromises.push(stream);
    } catch (err) {
      req.files[i].cloudStorageError = err;
      next(err);
    }
  }

  Promise.all(filesPromises).then(() => {
    for (let i = 0; i < req.files.length; i += 1) {
      const gcsname = timestamp + req.files[i].originalname;
      req.files[i].cloudStorageObject = gcsname;
      req.files[i].cloudStoragePublicUrl = getPublicUrl(gcsname);
    }
    next();
  }).catch((err) => {
    next(err);
  });

}

// Routes
let routes = express.Router();

function routeLogger(req, res, next) {
  console.log(`Router: access to [${req.path}] by [${req.user?req.user.email:'guest'}]`);
  next();
}

routes.post('/api/signup', routeLogger, usersController.signup);
routes.post('/api/signin', routeLogger, usersController.signin);

routes.get('/api/opportunities', jwtCheck, routeLogger, opportunitiesController.getOpportunities);
routes.put('/api/opportunities',jwtCheck, routeLogger, upload.any(), sendUploadToGCS, opportunitiesController.addOpportunity);
routes.post('/api/opportunities/:id/proposals/', jwtCheck, routeLogger, opportunitiesController.addProposal);

// routes.get('/api/marketOpportunities', jwtCheck, opportunitiesController.getMarketOpportunities);

module.exports = routes;
