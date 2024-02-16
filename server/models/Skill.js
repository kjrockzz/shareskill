const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill: { type: String, required: true, unique: true },
    // Add more fields as needed
});

const SkillModel = mongoose.model('Skill', skillSchema);

module.exports = SkillModel;
