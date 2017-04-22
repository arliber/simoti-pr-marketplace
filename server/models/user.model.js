const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createDate: Date,
  updateDate: Date,
});

userSchema.pre('save', function(next) {
  // Handle dates
  const currentDate = new Date();
  this.updateDate = currentDate;

  if (!this.createDate) {
    this.createDate = currentDate;
  }

  // Handle password
  if (this.isNew) {
    this.password = crypto.createHash('sha256').update(this.password).digest('base64')
  }

  next();
});

userSchema.methods.updatePassword = function (password) {
  this.password = crypto.createHash('sha256').update(password).digest('base64');
};

userSchema.statics.getUserByEmail = function(email) {
  return this.findOne({email}).exec();
};

module.exports = mongoose.model('User', userSchema);
