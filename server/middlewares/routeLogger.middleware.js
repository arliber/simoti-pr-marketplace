function routeLogger(req, res, next) {
  console.log(`Router: access to [${req.path}] by [${req.user ? req.user.email : 'guest'}]`);
  next();
}

module.exports = routeLogger;
