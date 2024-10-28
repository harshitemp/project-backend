const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['general', 'technical', 'personalTechnical']
  },
  question: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
