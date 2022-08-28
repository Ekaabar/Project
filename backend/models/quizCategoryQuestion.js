const mongoose = require('mongoose');

const quizCategoryQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    imageUrl: { type: String, required: false },
    quizCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategory",
        autopopulate: true
    },
});

module.exports = mongoose.model('QuizCategoryQuestion', quizCategoryQuestionSchema);