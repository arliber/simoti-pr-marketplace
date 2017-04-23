var mongoose = require('mongoose');
const Opportunity = require('../models/opportunity.model');

function getOpportunities(req, res, next) {
  Opportunity.getUserOpportunities(req.user.email).then((opportunities) => {
    res.status(200).json(opportunities);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

/* function getMarketOpportunities(req, res, next) {
  Opportunity.getMarketOpportunities(req.user.email).then((opportunities) => {
    res.status(200).json(opportunities);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}*/

function addOpportunity(req, res, next) {
  const payload = req.body;
  const userData = {
    userId: req.user.email,
  };
  const files = {
    files: req.files.map((file) => file.cloudStoragePublicUrl),
  };
  let opportunity = new Opportunity(Object.assign(payload, userData, files));
  opportunity.save((err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
    next();
  });
}

function addProposal(req, res, next) {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
    userId: { $ne: req.user.email },
  };
  const newProposal = {
    userId: req.user.email,
    proposalInfo: req.body.proposalInfo,
  };
  Opportunity.findOneAndUpdate(query, { $push: { proposals: newProposal } })
    .exec().then(() => {
    res.status(200).json({});
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

module.exports = {
  getOpportunities,
  addOpportunity,
  // getMarketOpportunities,
  addProposal,
};
