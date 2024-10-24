// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for registering users
router.get('/register', userController.getAllUser);
router.post('/register', userController.registerUser);

module.exports = router;
