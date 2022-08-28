const mongoose = require("mongoose");

const userQuizCategoryQuestionChildSchema = mongoose.Schema({
  title: { type: String, required: true },
  enable: { type: Boolean, default: true },
  dateCreated: { type: Date, default: Date.now },
  imageUrl: { type: String, required: false },
  description: { type: String, required: false },
  questionType: { type: String, enum: ["text", "photo"] },
  answerSelectionType: { type: String, enum: ["single", "multiple"] },
  point: { type: Number, default: 0, required: true },
  // option list
  quizCategoryQuestionOptionCorrects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizCategoryQuestionOption",
    },
  ],
  // Response family
  userQuizCategoryQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserQuizCategoryQuestion",
  },
  quizCategoryQuestionChild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCategoryQuestionChild",
  },
});

userQuizCategoryQuestionChildSchema.index(
  { userQuizCategoryQuestion: 1, quizCategoryQuestionChild: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "UserQuizCategoryQuestionChild",
  userQuizCategoryQuestionChildSchema
);
