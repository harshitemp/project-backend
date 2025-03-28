const AccountUser = require('../models/userModel');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config();

let otps = {};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received email:', email);
    const user = await AccountUser.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a 4-digit numeric OTP
    const otp = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    otps[email] = otp;
    console.log('Generated OTP:', otp);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('Error during OTP sending:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (otps[email] === otp) {
    delete otps[email];
    res.status(200).json({ message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AccountUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', userType: user.userType });
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};