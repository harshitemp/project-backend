const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to create a new student registration
router.post('/students', studentController.createStudent);

// Route to get all students
router.get('/students', studentController.getAllStudents);

// Route to get a student by ID
router.get('/students/:id', studentController.getStudentById);

module.exports = router;
