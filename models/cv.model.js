// models/Cv.js
const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technical: String,
  laboratory: String,
  bioinformatic: String,
  projects: [String],
  domainExpertise: String,
  education: [String],
  objective: String,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedin: String,
  github: String,
  internship: String,
  achievements: [String],
  interests: String,
  uploadedImageUrl: String
});

module.exports = mongoose.model('Cv', CvSchema);