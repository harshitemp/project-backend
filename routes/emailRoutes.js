const express = require('express');
const { sendSelectionEmails } = require('../controllers/emailController');

const router = express.Router();

// Route to send emails to multiple users
router.post('/send-selection-emails', sendSelectionEmails);

module.exports = router;
