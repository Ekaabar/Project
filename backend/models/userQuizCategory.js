const mongoose = require('mongoose');

const userQuizCategorySchema = mongoose.Schema({
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    userQuiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserQuiz"
    },
    quizCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategory"
    },
    name: { type: String, required: true }
});

userQuizCategorySchema.virtual('userQuizCategoryQuestions', {
    ref: 'UserQuizCategoryQuestion',
    localField: '_id',
    foreignField: 'userQuizCategory'
});

var autoPopulatePre = function (next) {
    this.populate('quizCategory');
    this.populate('userQuiz');
    next();
};
var autoPopulatePos = function (next) {
    this.populate('userQuizCategoryQuestions');
    next();
};

userQuizCategorySchema.
    pre('findOne', autoPopulatePre).
    pre('find', autoPopulatePre);

// Set Object and Json property to true. Default is set to false
userQuizCategorySchema.set('toObject', { virtuals: true });
userQuizCategorySchema.set('toJSON', { virtuals: true });

userQuizCategorySchema.index({ userQuiz: 1, quizCategory: 1 }, { unique: true });

module.exports = mongoose.model('UserQuizCategory', userQuizCategorySchema);