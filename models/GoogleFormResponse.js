const mongoose = require('mongoose');

const GoogleFormResponseSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: [String], required: true },
  cgpa: { type: Number, required: true },
  stream: { type: String, required: true },
  subStream: { type: String, required: true },
});

module.exports = mongoose.model('GoogleFormResponse', GoogleFormResponseSchema);
