const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    eventManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventManager' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number },
    review: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model('Review', reviewSchema);