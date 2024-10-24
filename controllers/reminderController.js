// controllers/reminderController.js
const Reminder = require('../models/reminderModel');

// Function to send a reminder
exports.getAllReminder = async (req, res) => {
    try {
        const reminder = await Reminder.find();
        res.status(200).json(reminder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.sendReminder = async (req, res) => {
  try {
    const { studentId, message, type } = req.body;

    const newReminder = new Reminder({
      studentId,
      message,
      type
    });

    const savedReminder = await newReminder.save();
    res.status(201).json({ message: 'Reminder sent successfully', reminder: savedReminder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reminder' });
  }
};
