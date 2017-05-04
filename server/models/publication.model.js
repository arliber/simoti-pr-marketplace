const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String },
  url: { type: String },
  propositions: [
    {
      userId: { type: Array },
      title: { type: String },
      url: { type: String},
      files: { type: Schema.Types.Mixed },
      status: { type: String, required: true, default: 'available' }, /* available, disabled, deleted */
      comment: { type: String },
      createDate: { type: Date },
    },
  ],
  status: { type: String, required: true, default: 'available' }, /* available, disabled, deleted */
  comment: { type: String },
  createDate: { type: Date },
  updateDate: { type: Date },
});

publicationSchema.pre('save', function(next) {
  // Handle dates
  const currentDate = new Date();
  this.updateDate = currentDate;

  if (!this.createDate) {
    this.createDate = currentDate;
  }

  next();
});

publicationSchema.statics.getPublications = function(userId) {
  return this.find({
    userId: { $ne: userId },
  }).exec();
};

publicationSchema.statics.getUserPublications = function(userId) {
  return this.find({
    userId,
  }).exec();
};

module.exports = mongoose.model('publications', publicationSchema);
