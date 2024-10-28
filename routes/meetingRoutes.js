const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route for getting all meetings
router.get('/meetings', meetingController.getAllMeeting); // Note: Changed to /meetings for consistency

// Route for scheduling a meeting
router.post('/meetings', meetingController.scheduleMeeting); // Changed to /meetings for consistency

module.exports = router;
