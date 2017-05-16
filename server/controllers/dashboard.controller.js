var mongoose = require('mongoose');
const Article = require('../models/article.model');
const Publication = require('../models/publication.model');

function _getTotalArticles() {
  return Article.count().exec();
}

function _getTotalPublications() {
  return Publication.count().exec();
}

function _getModelBreakdownByStatus(model ,userId) {
  return model.find({'propositions.userId': userId}).exec().then((items) => {
    return items.reduce((result, item) => {
      const lastProposition = item.propositions
                             .filter(proposition => proposition.userId === userId)
                             .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
                             .pop();
      if (lastProposition && lastProposition.status) {
        result[lastProposition.status] += 1;
      }
      return result;
    }, { accepted: 0, rejected: 0, pending: 0 });
  });
}

function _getModelPropositionsCount(model ,userId) {
  return model.find({ userId }).exec().then((items) => {
    return items.reduce((result, item) => {
      const propositions = item.propositions.filter(proposition => !proposition.isOwnersProposition);
      return propositions.length;
    }, 0);
  });
}

function getDashboard(req, res, next) {
  Promise.all([_getTotalArticles(),
               _getTotalPublications(),
               _getModelBreakdownByStatus(Publication, req.user.email),
               _getModelBreakdownByStatus(Article, req.user.email),
               _getModelPropositionsCount(Publication, req.user.email),
               _getModelPropositionsCount(Article, req.user.email),
  ]).then((results) => {
    res.status(200).json({
      totalArticles: results[0],
      totalPublications: results[1],
      publicationsOpportunities: results[2],
      articlesOpportunities: results[3],
      publicationsPropositions: results[4],
      articlesPropositions: results[5],
    });
    next();
  }).catch((err) => {
    res.status(500).json(err);
    next();
  });
}

module.exports = {
  getDashboard,
};
