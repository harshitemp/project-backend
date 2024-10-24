// routes/reminderRoutes.js
const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
router.get('/reminder', reminderController.getAllReminder);

router.post('/reminder', reminderController.sendReminder);

module.exports = router;
