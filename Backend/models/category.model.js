const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: { type: String },
    descriptions: { type: String },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Category', categorySchema);