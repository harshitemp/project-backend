const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
  recruiterName: { type: String, required: true },
  companyProfile: { type: String, required: true },
  jobTitle: { type: String, required: true },
  ctc: { type: String, required: true },
  eligibility: { type: String, required: true },
  skillSet: { type: String, required: true },
  selectionProcess: { type: String, required: true },
  location: { type: String, required: true },
  trainingNeed: { type: String, required: true },
  recruiterStatus: { type: String, required: true },
  registrationDeadline: { type: Date, required: true },
  recruitmentDates: { type: String, required: true },
  driveMode: { type: String, required: true },
  additionalInfo: { type: String },
  acceptedByName: { type: String },
  acceptedByEmail: { type: String },
});

module.exports = mongoose.model('Recruitment', recruitmentSchema);
