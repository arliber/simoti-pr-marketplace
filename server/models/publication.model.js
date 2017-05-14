const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String },
  url: { type: String },
  propositions: [
    {
      userId: { type: String },
      title: { type: String },
      url: { type: String},
      files: { type: Schema.Types.Mixed },
      status: { type: String, required: true, default: 'available' }, /* available, disabled, deleted */
      comment: { type: String },
      createDate: { type: Date },
      isOwnersProposition: { type: Boolean, default: false },
    },
  ],
  status: { type: String, required: true, default: 'available' }, /* available, disabled, deleted */
  comment: { type: String },
  createDate: { type: Date },
  updateDate: { type: Date },
});

publicationSchema.pre('save', function (next) {
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

publicationSchema.statics.getPublications = function (userId) {
  return this.find({
    userId: { $ne: userId },
  }).exec();
};

publicationSchema.statics.getUserPublications = function (userId) {
  return this.find({
    userId,
  }).exec();
};

module.exports = mongoose.model('publications', publicationSchema);
