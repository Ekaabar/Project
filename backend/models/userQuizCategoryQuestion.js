const mongoose = require('mongoose');

const userQuizCategoryQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    userQuizCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserQuizCategory"
    },
    quizCategoryQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategoryQuestion"
    },
    userQuizCategoryQuestionChilds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserQuizCategoryQuestionChild",
        required: false
    }],
    userInput: [{
        type: Number, default: 0, required: false
    }],
    correctPoints: { type: Number, default: 0, required: false },
    numberOfCorrectAnswers: { type: Number, default: 0, required: false },
    numberOfIncorrectAnswers: { type: Number, default: 0, required: false },
    numberOfQuestions: { type: Number, default: 0, required: false },
    totalPoints: { type: Number, default: 0, required: false },
    questions: [{ type: Map, of: String }],
});

var autoPopulate = function (next) {
    this.populate('userQuizCategory');
    this.populate('quizCategoryQuestion');
    next();
};
userQuizCategoryQuestionSchema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

userQuizCategoryQuestionSchema.index({ userQuizCategory: 1, quizCategoryQuestion: 1 }, { unique: true });
// Set Object and Json property to true. Default is set to false
userQuizCategoryQuestionSchema.set('toObject', { virtuals: true });
userQuizCategoryQuestionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserQuizCategoryQuestion', userQuizCategoryQuestionSchema);