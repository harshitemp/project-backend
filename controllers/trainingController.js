// controllers/emailController.js
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
require("dotenv").config();

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send email notification
const sendMail = async (recipients, sessionDetails) => {
    if (recipients.length === 0) {
        console.error("No recipients to send the email to.");
        return;
    }

    const mailOptions = {
        from: {
            name: "Your Organization",
            address: process.env.EMAIL_USER,
        },
        to: recipients.join(","), // Join emails into a single string
        subject: "New Training Session Notification",
        text: `A new training session has been scheduled.\n\nDetails:\n${sessionDetails}`,
        html: `<p>A new training session has been scheduled.</p><p><b>Details:</b></p><p>${sessionDetails}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent to all recipients");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

exports.notifyRegisteredUsers = async (req, res) => {
    try {
        // Retrieve all registered users
        const users = await User.find({ role: { $in: ["student", "university", "company", "coordinator"] } });
        
        console.log("Found users:", users); // Debugging line

        // Extract emails from the retrieved users
        const recipients = users.map(user => user.email).filter(email => email); // Filter out undefined or empty emails
        console.log("Recipients:", recipients); // Debugging line

        if (recipients.length === 0) {
            return res.status(400).json({ error: "No registered users found to send email to." });
        }

        // Define the session details
        const sessionDetails = `
            Title: ${req.body.title}
            Date: ${req.body.date}
            Time: ${req.body.time}
            Venue: ${req.body.venue}
            Trainer: ${req.body.trainer}
        `;

        // Send email to all registered users
        await sendMail(recipients, sessionDetails);

        res.status(200).json({ message: "Notification sent to all registered users" });
    } catch (error) {
        console.error("Error in notifyRegisteredUsers:", error);
        res.status(500).json({ error: error.message });
    }
};
