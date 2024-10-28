// models/Footer.js
const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    google: String,
    instagram: String,
    linkedin: String,
    youtube: String,
  },
});

module.exports = mongoose.model('Footer', FooterSchema);
