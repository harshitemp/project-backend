// routes/recruitmentRoutes.js
const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

// Route to get all recruitment data
router.get('/recruitment', recruitmentController.getAllRecruitments);

// Route to create new recruitment data
router.post('/recruitment', recruitmentController.createRecruitment);

module.exports = router;
