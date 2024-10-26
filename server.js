const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing routes
const placementRoutes = require('./routes/placementRoutes');
const campusDriveRoutes = require('./routes/campusDriveRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cvroutes = require('./routes/cv.routes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const recruitmentRoutes = require('./routes/recruitmentRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const studentRoutes = require('./routes/studentRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' })); // If your Angular app is running on port 4200

// Middleware
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://mongodb:mongodb@cluster0.as6af.mongodb.net/contactFeedbackDB?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Using imported routes
app.use('/api', placementRoutes);
app.use('/api', campusDriveRoutes);
app.use('/api', contactRoutes);
app.use('/api', cvroutes);
app.use('/api', feedbackRoutes);
app.use('/api', meetingRoutes);
app.use('/api', recruitmentRoutes);
app.use('/api', reminderRoutes);
app.use('/api', studentRoutes);
app.use('/api', trainingRoutes);
app.use('/api', userRoutes);
// Adding the new /api/data routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from Node.js backend' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

// Listening on port 5000 for all routes
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
