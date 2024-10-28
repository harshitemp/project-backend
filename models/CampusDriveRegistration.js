// models/registrationModel.js
const mongoose = require('mongoose');

const CampusDriveSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  stream: String,
  mobile: String,
  email: String,
  campuses: {
    vizianagaram: Boolean,
    bhubaneswar: Boolean
  }
});

module.exports = mongoose.model('Registration', CampusDriveSchema);
