// controllers/trainingController.js
const TrainingSession = require('../models/TrainingSession');

// Create a new training session
exports.createTrainingSession = async (req, res) => {
    try {
        const newSession = new TrainingSession(req.body);
        await newSession.save();
        res.status(201).json({ message: 'Training session created successfully', newSession });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all training sessions
exports.getAllTrainingSessions = async (req, res) => {
    try {
        const sessions = await TrainingSession.find();
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a training session
exports.updateTrainingSession = async (req, res) => {
    try {
        const updatedSession = await TrainingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Training session updated successfully', updatedSession });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a training session
exports.deleteTrainingSession = async (req, res) => {
    try {
        await TrainingSession.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Training session deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
