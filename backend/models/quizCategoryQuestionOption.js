const mongoose = require('mongoose');

const quizCategoryQuestionOptionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    quizCategoryQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategoryQuestion",
        required: true,
        autopopulate: true
    },
    quizCategoryQuestionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategoryQuestionType",
        required: false
    },
});

module.exports = mongoose.model('QuizCategoryQuestionOption', quizCategoryQuestionOptionSchema);