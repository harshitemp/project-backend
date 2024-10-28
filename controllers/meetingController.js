const Meeting = require('../models/meetingModel');

// Function to schedule a meeting
exports.scheduleMeeting = async (req, res) => {
  try {
    const { meetingDate, createdBy } = req.body;

    // Validate input
    if (!meetingDate || !createdBy) {
      return res.status(400).json({ message: 'Meeting date and createdBy are required' });
    }

    // Create a new meeting
    const newMeeting = new Meeting({
      meetingDate,
      createdBy
    });

    // Save the meeting to the database
    const savedMeeting = await newMeeting.save();

    res.status(201).json({ message: 'Meeting scheduled successfully', meeting: savedMeeting });
  } catch (error) {
    console.error('Error scheduling meeting:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to get all meetings
exports.getAllMeeting = async (req, res) => {
  try {
    const meetings = await Meeting.find(); // Fetch all meetings from the database
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};
