const Question = require('../models/Question');

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions); // Return a 200 status for successful retrieval
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  const { category, question } = req.body;

  // Check if required fields are provided
  if (!category || !question) {
    return res.status(400).json({ message: "Category and question are required." });
  }

  const newQuestion = new Question({ category, question });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(400).json({ message: error.message });
  }
};
