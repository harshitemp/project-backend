// routes/cvRoutes.js
const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');

// Routes
router.post('/cvs', cvController.createCv);
router.get('/cvs', cvController.getAllCvs);
router.get('/cvs/:id', cvController.getCvById);
router.put('/cvs/:id', cvController.updateCv);
router.delete('/cvs/:id', cvController.deleteCv);



module.exports = router;