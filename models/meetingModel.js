const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  meetingDate: { type: Date, required: true },
  createdBy: { type: String, required: true }, // Tracks the user scheduling the meeting
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
