// routes/cv.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cvController = require('../controllers/cv.controller');

// Set up Multer for file uploads
const storage = multer({ dest: 'uploads/' }); // Define the destination folder for uploads
const upload = multer({ storage });

// Route to upload a CV
router.post('/upload', upload.single('cvFile'), cvController.uploadCV);

// Route to get all CVs
router.get('/upload', cvController.getCVs);

module.exports = router;
