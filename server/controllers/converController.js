const converModel = require("../models/conversation");
const messageModel = require("../models/message");
const UserModel = require("../models/user");


exports.conversations =  async (req, res) =>{
    try {
        const {senderId, reciverId} = req.body;
        const newConversation = new converModel({members: [senderId,reciverId]});
        await newConversation.save();
        res.status(200).send("conversation created successfully");
    } catch (error) {
        console.log(error,'error');
    }
};

exports.getconversations = async (req, res) =>{
    try {
        const userId = req.params.userId;
        const conversations = await converModel.find({members:{$in: [userId]}});
        const conversationUserData= Promise.all(conversations.map( async (conversation)=>{
            const reciverId =  conversation.members.find((member)=>member !== userId);
           const user= await UserModel.findById(reciverId);
           return {user: {email:user.email , name:user.name, profile: user.profile}, conversation: conversation._id}
        }));
        res.status(200).json(await conversationUserData);

    } catch (error) {
        console.log(error,'error');
    }
};

exports.messages=async (req, res) =>{
    try {
        const {conversationId, senderId, message , reciverId=''} = req.body;
        if(!senderId || !message) return res.status(400).send("please fill");
        if(!conversationId && reciverId){
            const newConversation = new converModel({members: [senderId,reciverId]});
            await newConversation.save();
            const newMessage = new messageModel({conversationId:newConversation._id,senderId,message});
            await newMessage.save();
            return res.status(200).send("message sent sucessfully");
        }
        else if (!reciverId && !conversationId) {
            return res.status(400).send("please fill all requ9ired fields");
        }
        
            const newMessage = new messageModel({conversationId,senderId,message});
            await newMessage.save();
            res.status(200).send("message sent sucessfully");
        
       
    } catch (error) {
        console.log(error,"error")
    }
};

exports.getmessages=async (req, res) =>{
    try {
        const conversationId = req.params.conversationId;
        if(conversationId=== 'new') return res.status(200).json([]);
        const message = await messageModel.find({conversationId});
        const messageUserData = Promise.all(message.map(async (message) =>{
            const user = await UserModel.findById(message.senderId);
            return {user:{email:user.email,name:user.name,},message:message.message}
        }))
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.log(error,"error");
    }
};

exports.getusers=async (req, res) =>{
    try {
        const users = await UserModel.find();
        const UserData = Promise.all(users.map(async (user) =>{
            return {user:{email:user.email,name:user.name,},userId:user._id}
        }));
        res.status(200).json(await UserData);
    } catch (error) {
        console.log(error,"error");
    }
}