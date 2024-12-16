const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

// Routes for Google Form data
router.get('/get-google-form-responses', recruitmentController.getGoogleFormResponses);
router.post('/store-google-form-data', recruitmentController.storeGoogleFormData);

// Recruitment routes
router.post('/create-recruitment', recruitmentController.createRecruitment);
router.get('/accepted-recruitments', recruitmentController.getAcceptedRecruitments);

module.exports = router;
