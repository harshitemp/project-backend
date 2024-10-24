// controllers/placementController.js
const Placement = require('../models/Placement');
const xlsx = require('xlsx');

// Upload and parse Excel file
exports.uploadExcel = async (req, res) => {
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // Save data to the database
        const placements = await Placement.insertMany(jsonData);
        res.status(201).json({ message: 'Data uploaded successfully', placements });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all placements
exports.getAllPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        res.status(200).json(placements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
