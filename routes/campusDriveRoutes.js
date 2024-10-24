// routes/campusDriveRoutes.js
const express = require('express');
const router = express.Router();
const campusDriveController = require('../controllers/campusDriveController');

router.post('/registercampus', campusDriveController.registerForCampusDrive); // Register for campus drive
router.get('/registercampus', campusDriveController.getAllRegistrations); // Get all registrations

module.exports = router;
