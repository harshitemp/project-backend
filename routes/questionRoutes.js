const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Get all questions
router.get('/questions', questionController.getAllQuestions);

// Add a new question
router.post('/questions', questionController.addQuestion);

module.exports = router;
