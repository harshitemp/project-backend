// controllers/meetingController.js
const Meeting = require('../models/meetingModel');

// Schedule a new meeting
exports.getAllMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.find();
        res.status(200).json(meeting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.scheduleMeeting = async (req, res) => {
  try {
    const { meetingDate, createdBy } = req.body;

    // Create a new meeting
    const newMeeting = new Meeting({
      meetingDate,
      createdBy
    });

    // Save the meeting to the database
    const savedMeeting = await newMeeting.save();

    res.status(201).json({ message: 'Meeting scheduled successfully', meeting: savedMeeting });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
