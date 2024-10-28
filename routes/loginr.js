const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST route for login
router.post('/login', loginController.loginUser);

module.exports = router;
