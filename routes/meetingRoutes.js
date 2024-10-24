// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route for scheduling a meeting
router.get('/meeting', meetingController.getAllMeeting);

router.post('/meeting', meetingController.scheduleMeeting);

module.exports = router;
