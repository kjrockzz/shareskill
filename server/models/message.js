const mongoose = require('mongoose');

const messageScema = new mongoose.Schema({
    conversationId: {type: String, },
    senderId:{
        type : String,
    },
    message: {type: String}
    
    
})

const Message = mongoose.model("Message",messageScema);
module.exports = Message; 