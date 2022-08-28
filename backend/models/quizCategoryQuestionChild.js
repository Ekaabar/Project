const mongoose = require('mongoose');

const quizCategoryQuestionChildSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    imageUrl: { type: String, required: false },
    questionType: { type: String, enum: ["text", "photo"] },
    answerSelectionType: { type: String, enum: ["single", "multiple"] },
    point: { type: Number, default: 0, required: true },
    quizCategoryQuestionParent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategoryQuestion",
        autopopulate: true
    },
    quizCategoryQuestionOptionCorrects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategoryQuestionOption",
        required: true,
        autopopulate: true
    }],
});


var autoPopulateOptionCorrects = function (next) {
    this.populate('quizCategoryQuestionOptionCorrects');
    next();
};

quizCategoryQuestionChildSchema.
    pre('findOne', autoPopulateOptionCorrects).
    pre('find', autoPopulateOptionCorrects);

module.exports = mongoose.model('QuizCategoryQuestionChild', quizCategoryQuestionChildSchema);