const mongoose = require('mongoose');

const accountUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true }
});

module.exports = mongoose.model('AccountUser', accountUserSchema);
