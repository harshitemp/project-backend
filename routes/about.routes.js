// about.routes.js
const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');

// Route to get "About Us" content
router.get('/about', aboutController.getAboutContent);

// Route for signup redirect
router.get('/signup', aboutController.signupRedirect);

module.exports = router;
