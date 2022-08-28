const mongoose = require('mongoose');

const userLevelSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    dateCreated: { type: Date, default: Date.now },
    enable: { type: Boolean, default: true },
});

module.exports = mongoose.model('UserLevel', userLevelSchema);