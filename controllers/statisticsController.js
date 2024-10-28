const Statistics = require('../models/statisticsModel');

// Get statistics
exports.getStatistics = async (req, res) => {
    try {
        const statistics = await Statistics.find();
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Optionally, create a method to add/update statistics
exports.createStatistics = async (req, res) => {
    const { students, programs, recruiters } = req.body;
    try {
        const newStatistics = new Statistics({ students, programs, recruiters });
        await newStatistics.save();
        res.status(201).json(newStatistics);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
