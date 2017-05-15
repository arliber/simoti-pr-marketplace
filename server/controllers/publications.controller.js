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

function addProposition(req, res, next) {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
    // userId: { $ne: req.user.email },
  };
  // TODO: req.body.inReplyToUser could be faked - allow this condition only to article owners
  const isOwnersProposition = typeof req.body.inReplyToUser !== 'undefined';
  const newProposition = {
    userId: isOwnersProposition ? req.body.inReplyToUser : req.user.email,
    title: req.body.title,
    url: req.body.url,
    files: req.files.map((file) => file.cloudStoragePublicUrl),
    comment: req.body.comment,
    isOwnersProposition,
  };
  newProposition.createDate = new Date();

  Publication.findOneAndUpdate(query, { $push: { propositions: newProposition } })
    .exec().then(() => {
    res.status(200).json({});
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

function updatePropositionStatus(req, res, next) {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
  };
  Publication.findOne(query).then((publication) => {
    publication.propositions.forEach((proposition) => {
      if (proposition.userId === req.params.userId) {
        proposition.status = req.body.status;
      }
    });
    publication.save().then(() => {
      res.status(200).json({});
      next();
    }).catch((err) => {
      res.status(500).json(err);
      next();
    });
  }).catch((err) => {
    res.status(500).json(err);
    next();
  })
}

module.exports = {
  getPublications,
  getUserPublications,
  addPublication,
  addProposition,
  updatePropositionStatus,
};
