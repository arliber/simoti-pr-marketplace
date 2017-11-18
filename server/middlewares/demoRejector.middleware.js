const config = require('../config');

function demoRejector(req, res, next) {
  if(req.user.email !== config.demoAccountEmail) {
    next();
  } else {
    console.log(`demoRejector: Rejected request from ${config.demoAccountEmail}`)
    res.status(200).json({});
  }
}

module.exports = demoRejector;
