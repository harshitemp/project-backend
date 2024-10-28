const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Get all questions
router.get('/footerq', questionController.getAllQuestions);

// Add a new question
router.post('/footerq', questionController.addQuestion);

module.exports = router;
