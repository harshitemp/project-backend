// models/reminderModel.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  studentId: { type: Number, required: true }, // Ensure data type is consistent with frontend
  message: { type: String, required: true },
  type: { type: String, enum: ['registration', 'training'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reminder', reminderSchema);
