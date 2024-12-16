const Placement = require('../models/Placement');
const XLSX = require('xlsx');
const fs = require('fs');

exports.uploadExcel = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const placements = sheetData.map(data => ({
            name: data.Name,
            registrationNumber: data.RegistrationNumber,
            stream: data.Stream,
            status: data.Status
        }));

        await Placement.insertMany(placements);
        fs.unlinkSync(filePath); // Remove file after processing

        res.status(200).json({ message: 'File uploaded and data saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPlacements = async (_req, res) => {
    try {
        const placements = await Placement.find();
        res.status(200).json(placements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
