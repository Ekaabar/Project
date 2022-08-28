const mongoose = require("mongoose");
// Particpation
const userQuizSchema = mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  enable: { type: Boolean, default: true },
  // used to disable a multiple response to the same question ( when all questions are responded ==> question disable)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

userQuizSchema.virtual("userQuizCategories", {
  ref: "UserQuizCategory",
  localField: "_id",
  foreignField: "userQuiz",
});

var autoPopulate = function (next) {
  this.populate("user").populate("quiz");
  // .populate({ path: "userQuizCategories"})
  next();
};

userQuizSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

// Set Object and Json property to true. Default is set to false
userQuizSchema.set("toObject", { virtuals: true });
userQuizSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("UserQuiz", userQuizSchema);
