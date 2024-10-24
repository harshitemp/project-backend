// routes/recruitmentRoutes.js
const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

// Route to get all recruitment data
router.get('/recuritment', recruitmentController.getAllRecruitments);

// Route to create new recruitment data
router.post('/recuritment', recruitmentController.createRecruitment);

module.exports = router;
