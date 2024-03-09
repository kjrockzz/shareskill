const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: { type: Array,required :true  }, // Ensure name is unique
    
})

const  Conversation = mongoose.model("conversation",conversationSchema);
module.exports = Conversation; 