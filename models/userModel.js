// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['student', 'manager-cr', 'trainer', 'coordinator'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
