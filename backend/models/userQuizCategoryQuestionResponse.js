const mongoose = require('mongoose');

const userQuizCategoryQuestionResponseSchema = mongoose.Schema({
    title: { type: String, required: true },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    quizCategoryQuestionOption: { type: mongoose.Schema.Types.ObjectId, ref: "QuizCategoryQuestionOption" },
    userQuizCategoryQuestionChild: { type: mongoose.Schema.Types.ObjectId, ref: "UserQuizCategoryQuestionChild" },
    selectedResponse: { type: Boolean, default: false },
});


userQuizCategoryQuestionResponseSchema.index({ userQuizCategoryQuestionChild: 1, quizCategoryQuestionOption: 1 }, { unique: true });

module.exports = mongoose.model('UserQuizCategoryQuestionResponse', userQuizCategoryQuestionResponseSchema);