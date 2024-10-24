// routes/trainingRoutes.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.post('/training', trainingController.createTrainingSession); // Create new session
router.get('/training', trainingController.getAllTrainingSessions); // Get all sessions
router.put('/training/:id', trainingController.updateTrainingSession); // Update session
router.delete('/training/:id', trainingController.deleteTrainingSession); // Delete session

module.exports = router;
