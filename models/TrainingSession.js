// models/TrainingSession.js
const mongoose = require('mongoose');

const TrainingSessionSchema = new mongoose.Schema({
    campus: { type: String, required: true },
    stream: { type: String, required: true },
    venue: { type: String, required: true },
    trainerName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model('TrainingSession', TrainingSessionSchema);
