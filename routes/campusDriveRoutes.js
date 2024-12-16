const express = require('express');
const router = express.Router();
const campusDriveController = require('../controllers/campusDriveController');

// POST route to register a campus drive
router.post('/registercampus', campusDriveController.registerCampusDrive);

// GET route to fetch all campus drives
router.get('/registercampus', campusDriveController.getUpcomingCampusDrives);

// GET route to download campus drives as an Excel file
router.get('/downloadexcel', campusDriveController.downloadExcelFile);

module.exports = router;
