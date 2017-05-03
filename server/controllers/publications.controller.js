var mongoose = require('mongoose');
const Publication = require('../models/publication.model');

function getPublications(req, res, next) {
  Publication.getPublications(req.user.email).then((publications) => {
    res.status(200).json(publications);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

function getUserPublications(req, res, next) {
  Publication.getUserPublications(req.user.email).then((publications) => {
    res.status(200).json(publications);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

function addPublication(req, res, next) {
  const payload = req.body;
  const userData = {
    userId: req.user.email,
  };
  const publication = new Publication(Object.assign(payload, userData));
  publication.save((err) => {
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
    title: req.user.title,
    url: req.user.url,
    files: req.files.map((file) => file.cloudStoragePublicUrl),
    comment: req.body.comment,
  };
  newProposal.createDate = new Date();

  Publication.findOneAndUpdate(query, { $push: { proposals: newProposal } })
    .exec().then(() => {
    res.status(200).json({});
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

module.exports = {
  getPublications,
  getUserPublications,
  addPublication,
  addProposal,
};
