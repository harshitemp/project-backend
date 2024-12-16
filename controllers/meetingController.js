const nodemailer = require("nodemailer");
const Meeting = require('../models/meetingModel');
require("dotenv").config();

console.log("User:", process.env.EMAIL_USER);  // Check if EMAIL_USER is defined
console.log("Password:", process.env.EMAIL_PASS);  // Check if EMAIL_PASS is defined

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

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

        // Prepare the email options
        const mailOptions = {
            from: {
                name: 'Harshitha',
                address: process.env.EMAIL_USER,
            },
            to: ["harshithapoojari123@gmail.com"], // Adjust this to include recipients as needed
            subject: "New Meeting Scheduled",
            text: `A new meeting has been scheduled for ${meetingDate}.`,
            html: `<b>A new meeting has been scheduled for ${meetingDate}.</b>`, // You can format this as needed
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");

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
