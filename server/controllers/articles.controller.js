var mongoose = require('mongoose');
const Article = require('../models/article.model');

function getArticles(req, res, next) {
  Article.getArticles(req.user.email).then((articles) => {
    res.status(200).json(articles);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

function getUserArticles(req, res, next) {
  Article.getUserArticles(req.user.email).then((articles) => {
    res.status(200).json(articles);
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

function addArticle(req, res, next) {
  const payload = req.body;
  const userData = {
    userId: req.user.email,
  };
  const files = {
    files: req.files ? req.files.map((file) => file.cloudStoragePublicUrl) : [],
  };
  const article = new Article(Object.assign(payload, userData, files));
  article.save((err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({});
    }
    next();
  });
}

function addProposition(req, res) {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
    /*userId: { $ne: req.user.email },*/ // Need to be able to add proposition to himself
  };
  const newProposition = {
    userId: req.user.email,
    body: req.body.body,
    files: req.files.map((file) => file.cloudStoragePublicUrl),
    placement: req.body.placement,
    comment: req.body.comment,
    isOwnersProposition: req.body.userId !== req.user.email, // TODO: req.body.userId could be faked - allow this condition only to article owners
  };
  newProposition.createDate = new Date();

  Article.findOneAndUpdate(query, { $push: { propositions: newProposition } })
    .exec().then(() => {
    res.status(200).json({});
  }).catch((err) => {
    res.status(500).json(err);
  });
}

module.exports = {
  getArticles,
  getUserArticles,
  addArticle,
  addProposition,
};
