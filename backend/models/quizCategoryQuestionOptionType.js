const mongoose = require('mongoose');

const quizCategoryQuestionOptionTypeSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizCategoryQuestionOptionType', quizCategoryQuestionOptionTypeSchema);