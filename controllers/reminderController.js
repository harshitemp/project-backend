// controllers/reminderController.js
const Reminder = require('../models/reminderModel');
const nodemailer = require("nodemailer");
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

// Function to send a reminder
exports.getAllReminder = async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
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

        // Prepare the email options
        const mailOptions = {
            from: {
                name: 'Harshitha',
                address: process.env.EMAIL_USER,
            },
            to: ["harshithapoojari123@gmail.com"], // You can customize this list to include all registered students/universities
            subject: "New Reminder Notification",
            text: message,
            html: `<b>${message}</b>`, // You can format this as needed
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");

        res.status(201).json({ message: 'Reminder sent successfully', reminder: savedReminder });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Failed to send reminder' });
    }
};
