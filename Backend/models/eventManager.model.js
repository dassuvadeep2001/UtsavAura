const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ref } = require('joi');
const { type } = require('../validators/eventManager.validator');

const eventManagerSchema = new mongoose.Schema({
  eventManagerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: Number },
  categoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  service: [{ type: String, enum: ['Banquet', 'Caterer', 'Decorator', 'Studio'] }],
  description: { type: String },
  previousWorkImages: [{ type: String }],
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model('EventManager', eventManagerSchema);
