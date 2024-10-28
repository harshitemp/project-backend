const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// Get statistics
router.get('/statistics', statisticsController.getStatistics);

// Optionally, for adding statistics
router.post('/statistics', statisticsController.createStatistics);

module.exports = router;
