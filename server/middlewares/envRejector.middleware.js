function envRejector(env) {
  return (req, res, next) => {
    if(process.env.NODE_ENV === env) {
      console.log(`envRejector: Rejected request because env is [${process.env.NODE_ENV}] which is exactly [${env}]`);
      res.status(200).json({});
    } else {
      next();
    }
  };
}

module.exports = envRejector;
