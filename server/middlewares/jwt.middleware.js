const expressJwt = require('express-jwt');
const config = require('../config');

const jwtMiddleware = expressJwt({
  secret: config.server.jwtSecret,
});

module.exports = jwtMiddleware;
