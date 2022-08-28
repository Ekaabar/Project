const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Date, required: true },
  userLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserLevel",
    required: true
  },
  dateCreated: { type: Date, default: Date.now }
});

userSchema.virtual('fullName').get(function () {
  return this.name + ' ' + this.email;
});

userSchema.virtual('userQuizs', {
  ref: 'UserQuiz',
  localField: '_id',
  foreignField: 'user'
});

var autoPopulateUserLevel = function (next) {
  this.populate('userLevel');
    // .populate('userQuizs');
  next();
};

userSchema.
  pre('findOne', autoPopulateUserLevel).
  pre('find', autoPopulateUserLevel);

// Set Object and Json property to true. Default is set to false
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);