// models/cv.model.js
const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  projects: [String],
  education: [String],
  socialMedia: [String],
  languages: [String],
  summary: { type: String },
  imageUrl: { type: String }, // For storing the uploaded image URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CV', cvSchema);
