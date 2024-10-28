const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    students: { type: Number, required: true },
    programs: { type: Number, required: true },
    recruiters: { type: Number, required: true },
});

module.exports = mongoose.model('Statistics', statisticsSchema);
