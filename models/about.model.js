// about.model.js
// Placeholder schema (optional)
const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
});

module.exports = mongoose.model('About', AboutSchema);
