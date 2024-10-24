const Feedback = require('../models/Feedback');
exports.getAllFeedback = async (req, res) => {
  try {
      const feedback = await Feedback.find();
      res.status(200).json(feedback);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
exports.submitFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const newFeedback = new Feedback({ rating, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};
