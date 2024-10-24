// controllers/recruitmentController.js
const Recruitment = require('../models/Recruitment');

// Get all recruitment entries
exports.getAllRecruitments = async (req, res) => {
    try {
        const recruitments = await Recruitment.find();
        res.status(200).json(recruitments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new recruitment entry
exports.createRecruitment = async (req, res) => {
    const newRecruitment = new Recruitment(req.body);
    try {
        await newRecruitment.save();
        res.status(201).json(newRecruitment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
