const Feedback = require('../models/Feedback');
const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure dotenv is loaded

// Nodemailer transporter for sending emails
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

// Function to send feedback notification email
const sendFeedbackEmail = async (feedbackDetails) => {
    const mailOptions = {
        from: {
            name: 'Harshitha',
            address: process.env.EMAIL_USER,
        },
        to: ["harshithapoojari123@gmail.com"], // You can customize this to include more recipients
        subject: "New Feedback Submitted",
        text: `New feedback received:\nRating: ${feedbackDetails.rating}\nFeedback: ${feedbackDetails.feedback}`,
        html: `<b>New feedback received:</b><br><pre>Rating: ${feedbackDetails.rating}<br>Feedback: ${feedbackDetails.feedback}</pre>`, // Pretty-print feedback in HTML
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Submit feedback
exports.submitFeedback = async (req, res) => {
    try {
        const { rating, feedback } = req.body;
        const newFeedback = new Feedback({ rating, feedback });
        await newFeedback.save();

        // Send an email notification for the new feedback
        await sendFeedbackEmail({ rating, feedback });

        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};
