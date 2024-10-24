// controllers/cv.controller.js
const CV = require('../models/cv.model');

// Create or update a CV
exports.uploadCV = async (req, res) => {
  try {
    const cvData = req.body;
    if (req.file) {
      cvData.imageUrl = req.file.path; // Assuming you're storing the image path
    }
    const cv = new CV(cvData);
    await cv.save();
    res.status(201).json({ message: 'CV uploaded successfully', cv });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading CV', error });
  }
};

// Get all CVs
exports.getCVs = async (req, res) => {
  try {
    const cvs = await CV.find();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CVs', error });
  }
};
