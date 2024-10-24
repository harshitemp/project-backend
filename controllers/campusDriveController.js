// controllers/campusDriveController.js
const CampusDriveRegistration = require('../models/CampusDriveRegistration');

// Register for campus drive
exports.registerForCampusDrive = async (req, res) => {
    try {
        const newRegistration = new CampusDriveRegistration(req.body);
        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful', newRegistration });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await CampusDriveRegistration.find();
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
