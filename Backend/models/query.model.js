const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model('Query', querySchema);