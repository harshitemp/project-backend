// controllers/cvController.js
const Cv = require('../models/cv.model');

// Create a new CV
exports.createCv = async (req, res) => {
  try {
    const cv = new Cv(req.body);
    const savedCv = await cv.save();
    res.status(201).json(savedCv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all CVs
exports.getAllCvs = async (req, res) => {
  try {
    const cvs = await Cv.find();
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single CV by ID
exports.getCvById = async (req, res) => {
  try {
    const cv = await Cv.findById(req.params.id);
    if (!cv) return res.status(404).json({ message: 'CV not found' });
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a CV by ID
exports.updateCv = async (req, res) => {
  try {
    const updatedCv = await Cv.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCv) return res.status(404).json({ message: 'CV not found' });
    res.json(updatedCv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a CV by ID
exports.deleteCv = async (req, res) => {
  try {
    const deletedCv = await Cv.findByIdAndDelete(req.params.id);
    if (!deletedCv) return res.status(404).json({ message: 'CV not found' });
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};