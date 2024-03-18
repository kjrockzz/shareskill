const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    desc: { type: String, required: true },
    status: { type: String, required: true },
    admin: { type: String, required: true },
    adminpic:{type: String},
    skillReq: { type: Array },
    startTime: { type: Date, default: Date.now },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    uploadedAt: { type: Date, default: Date.now }
    // Add more fields as needed
});

const projectModel = mongoose.model('project', projectSchema);

module.exports = projectModel;
