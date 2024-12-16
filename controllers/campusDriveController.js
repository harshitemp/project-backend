const CampusDriveRegistration = require('../models/CampusDriveRegistration');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// Register a campus drive
exports.registerCampusDrive = async (req, res) => {
    try {
        const registration = new CampusDriveRegistration(req.body);
        await registration.save();
        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        console.error('Error registering campus drive:', error.message);
        res.status(500).json({ error: 'Failed to register campus drive' });
    }
};

// Get all upcoming campus drives
exports.getUpcomingCampusDrives = async (req, res) => {
    try {
        const registrations = await CampusDriveRegistration.find();
        res.status(200).json(registrations);
    } catch (error) {
        console.error('Error fetching campus drives:', error.message);
        res.status(500).json({ error: 'Failed to fetch campus drives' });
    }
};

// Download campus drives as an Excel file
exports.downloadExcelFile = async (req, res) => {
    try {
        const registrations = await CampusDriveRegistration.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Campus Drives');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Registration Number', key: 'regNumber', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Stream', key: 'stream', width: 15 },
            { header: 'Mobile', key: 'mobile', width: 15 },
            { header: 'Vizianagaram', key: 'vizianagaram', width: 15 },
            { header: 'Bhubaneswar', key: 'bhubaneswar', width: 15 },
        ];

        registrations.forEach((reg) =>
            worksheet.addRow({
                ...reg.toObject(),
                vizianagaram: reg.campuses?.vizianagaram ? 'Yes' : 'No',
                bhubaneswar: reg.campuses?.bhubaneswar ? 'Yes' : 'No',
            })
        );

        const filePath = path.join(__dirname, '../output', 'CampusDrives.xlsx');
        await workbook.xlsx.writeFile(filePath);

        res.download(filePath, 'CampusDrives.xlsx', (err) => {
            if (err) {
                console.error('Error sending Excel file:', err.message);
                res.status(500).json({ error: 'Failed to download Excel file' });
            }
            // Cleanup: Delete the file after download
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting file:', unlinkErr.message);
            });
        });
    } catch (error) {
        console.error('Error generating Excel file:', error.message);
        res.status(500).json({ error: 'Failed to generate Excel file' });
    }
};
