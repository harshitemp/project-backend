const mongoose = require('mongoose');

const CampusDriveRegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNumber: { type: String, required: true },
    email: { type: String, required: true },
    stream: { type: String, required: true },
    mobile: { type: String, required: true },
    campuses: {
        vizianagaram: { type: Boolean, default: false },
        bhubaneswar: { type: Boolean, default: false },
    },
});

module.exports = mongoose.model('CampusDriveRegistration', CampusDriveRegistrationSchema);
