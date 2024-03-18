const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Ensure name is unique
    email: { type: String, required: true },
    pass: { type: String, required: true },
    bio : {type: String, },
    profile : { type: String, },
    Skills : { type: Array, required: true}
})

const UserModel = mongoose.model("user",userScema);
module.exports = UserModel; 