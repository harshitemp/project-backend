// routes/trainingRoutes.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.post('/training', trainingController.notifyRegisteredUsers); // Create new session

module.exports = router;
