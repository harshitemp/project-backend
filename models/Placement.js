// models/Placement.js
const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    stream: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Placement', PlacementSchema);
