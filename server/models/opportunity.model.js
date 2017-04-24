const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String },
  articleUrl: { type: String},
  articleFile: { type: Schema.Types.Mixed },
  publications: { type: String },
  submissionDate: { type: Date },
  airDate: { type: Date },
  files: { type: Array },
  comments: { type: String },
  status: { type: String, required: true, default: 'Pending' },
  proposals: { type: Array },
  createDate: { type: Date },
  updateDate: { type: Date },
});

opportunitySchema.pre('save', function(next) {
  // Handle dates
  const currentDate = new Date();
  this.updateDate = currentDate;

  if (!this.createDate) {
    this.createDate = currentDate;
  }

  // Append HTTP to article links
  if (!this.articleUrl.match(/http:\/\//)) {
    this.articleUrl = `http://${this.articleUrl}`;
  }

  next();
});

opportunitySchema.statics.getUserOpportunities = function(userId) {
  return this.find(/*{ userId }*/).exec(); // TODO: Return filter when starting to get MARKET opportunities from server
};

opportunitySchema.statics.getMarketOpportunities = function(userId) {
  return this.find({
    userId: { $ne: userId },
  }).exec();
};

module.exports = mongoose.model('opportunities', opportunitySchema);
