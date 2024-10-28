// routes/footerRoutes.js
const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');

// Route to get footer data
router.get('/footer', footerController.getFooterData);

// Route to update footer data
router.put('/footer', footerController.updateFooterData);

module.exports = router;
