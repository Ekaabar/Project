const mongoose = require('mongoose');

const quizCategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        autopopulate: true
    }
});

module.exports = mongoose.model('QuizCategory', quizCategorySchema);