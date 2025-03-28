const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// OTP routes
router.post('/sendotp', loginController.sendOtp);
router.post('/verifyotp', loginController.verifyOtp);

// Login route
router.post('/login', loginController.loginUser);

module.exports = router;