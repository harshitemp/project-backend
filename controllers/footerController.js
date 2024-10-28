// controllers/footerController.js
const Footer = require('../models/Footer');

// Get footer data
exports.getFooterData = async (req, res) => {
  try {
    const footerData = await Footer.findOne();
    res.status(200).json(footerData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching footer data', error });
  }
};

// Update footer data
exports.updateFooterData = async (req, res) => {
  try {
    const updatedData = await Footer.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating footer data', error });
  }
};
