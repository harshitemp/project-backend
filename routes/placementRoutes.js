// routes/placementRoutes.js
const express = require('express');
const multer = require('multer');
const placementController = require('../controllers/placementController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to store uploaded files

router.post('/upload', upload.single('file'), placementController.uploadExcel); // Upload Excel
router.get('/placements', placementController.getAllPlacements); // Get all placements

module.exports = router;
