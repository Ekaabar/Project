const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    enable: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);