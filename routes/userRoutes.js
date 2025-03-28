const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users
router.get('/register', userController.getAllUser);

// Route to register a new user
router.post('/register', userController.registerUser);
router.delete('/register/:id', userController.deleteUser);

module.exports = router;