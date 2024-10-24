const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  college: { type: String, required: true },
  yearOfPassing: { type: Date, required: true },
  percentage: { type: String, required: true },
  completedTrainings: { type: String, required: false },
  skills: { type: String, required: false },
  preferredTraining: { type: String, required: false },
  interestedInPlacement: { type: Boolean, required: false },
  preferredJobRoles: { type: String, required: false },
  preferredLocation: { type: String, required: false },
  linkedin: { type: String, required: false },
  portfolio: { type: String, required: false },
  extracurricularActivities: { type: String, required: false },
  languagesKnown: { type: String, required: false },
  achievements: { type: String, required: false },
  additionalInformation: { type: String, required: false },
  declaration: { type: Boolean, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
