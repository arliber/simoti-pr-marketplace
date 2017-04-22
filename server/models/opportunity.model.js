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
  status: { type: String, required: true, default: 'live' },
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

  next();
});

opportunitySchema.statics.getUserOpportunities = function(userId) {
  return this.find({ userId }).exec();
};

module.exports = mongoose.model('opportunities', opportunitySchema);
