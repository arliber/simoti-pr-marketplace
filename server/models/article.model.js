const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String },
  url: { type: String},
  files: { type: Array },
  publication: { type: String },
  submissionDate: { type: Date },
  airDate: { type: Date },
  comment: { type: String },
  status: { type: String, required: true, default: 'available' }, /* available, disabled, deleted */
  propositions: [
    {
      userId: { type: String },
      body: { type: String },
      files: { type: Array },
      placement: { type: String },
      comment: { type: String },
      createDate: { type: Date },
      isOwnersProposition: { type: Boolean, default: false },
    },
  ],
  createDate: { type: Date },
  updateDate: { type: Date },
});

articleSchema.pre('save', function(next) {
  // Handle dates
  const currentDate = new Date();
  this.updateDate = currentDate;

  if (!this.createDate) {
    this.createDate = currentDate;
  }

  // Append HTTP to article links
  if (this.url && !this.url.match(/http:\/\//)) {
    this.url = `http://${this.url}`;
  }

  next();
});

articleSchema.statics.getArticles = function(userId) {
  return this.find({
    userId: { $ne: userId },
  }).exec();
};

articleSchema.statics.getUserArticles = function(userId) {
  return this.find({
    userId,
  }).exec();
};

module.exports = mongoose.model('articles', articleSchema);
