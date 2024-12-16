const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure dotenv is loaded

// Nodemailer transporter for sending confirmation emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS,  // Use environment variable for password
    },
});

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            userType,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Set up the email options
        const mailOptions = {
            from: {
                name: 'Harshitha', // Customize the sender name
                address: process.env.EMAIL_USER, // Use environment variable for sender address
            },
            to: email, // Send to the registered user's email
            subject: 'Registration Successful',
            text: `Hello ${email},\n\nThank you for registering as a ${userType}. Welcome to our platform!`,
            html: `<b>Hello ${email},</b><br>Thank you for registering as a <b>${userType}</b>. Welcome to our platform!`, // HTML version of the email
        };

        // Send confirmation email
        await transporter.sendMail(mailOptions);
        console.log('Email sent:', mailOptions.to); // Log email sent confirmation

        // Respond with success
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error("Error sending email:", error); // Log error if email fails
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
