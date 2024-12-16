const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const GoogleFormResponse = require('../models/GoogleFormResponse');
const Recruitment = require('../models/Recruitment');

// Fetch all Google Form responses
exports.getGoogleFormResponses = async (req, res) => {
  try {
    const responses = await GoogleFormResponse.find();
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Store Google Form data
exports.storeGoogleFormData = async (req, res) => {
  const { fullName, email, skills, cgpa, stream, subStream } = req.body;

  if (!fullName || !email || !skills || !cgpa || !stream || !subStream) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newResponse = new GoogleFormResponse({ fullName, email, skills, cgpa, stream, subStream });
    await newResponse.save();
    res.status(201).json({ message: 'Form data stored successfully', newResponse });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create Recruitment Entry
exports.createRecruitment = async (req, res) => {
  const { recruiterName, companyProfile, jobTitle } = req.body;

  if (!recruiterName || !companyProfile || !jobTitle) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRecruitment = new Recruitment(req.body);
    const savedRecruitment = await newRecruitment.save();
    await exports.sendRecruitmentEmail(savedRecruitment);
    res.status(201).json(savedRecruitment);
  } catch (error) {
    console.error('Error creating recruitment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Recruitment Email
// Send Recruitment Email
exports.sendRecruitmentEmail = async (recruitmentDetails) => {
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:4200'; // Replace with your frontend URL

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recruitmentDetails.email || 'default@example.com',
    subject: 'New Recruitment Entry',
    html: `
      <b>A new recruitment entry has been created:</b>
      <p>Recruiter Name: ${recruitmentDetails.recruiterName}</p>
      <p>Company Profile: ${recruitmentDetails.companyProfile}</p>
      <p>Job Title: ${recruitmentDetails.jobTitle}</p>
      <p>
        Click <a href="${frontendURL}/recruitment/${recruitmentDetails._id}" target="_blank">here</a> to view the recruitment details.
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to create a new recruitment entry
exports.createRecruitment = async (req, res) => {
  const newRecruitment = new Recruitment(req.body);

  try {
    const savedRecruitment = await newRecruitment.save();
    await this.sendRecruitmentEmail(savedRecruitment);
    res.status(201).json(savedRecruitment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Function to fetch accepted recruitments
exports.getAcceptedRecruitments = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is missing' });
  }

  try {
    const acceptedRecruitments = await Recruitment.find({
      recruiterStatus: 'Accepted',
      acceptedByEmail: email,
    });

    res.json(acceptedRecruitments);
  } catch (error) {
    console.error('Error fetching accepted recruitments:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
