const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel= require("./models/user")
const SkillModel = require("./models/Skill")
const bodyParser = require('body-parser');
const Authroutes = require("./routes/auth.routes");
const projroutes = require("./routes/projectRoute");
const msgroutes = require("./routes/conversationRoute");
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


app.listen(3000,()=>{
    console.log("server is running")
})



app.use(express.json());
app.use(cors());
app.use('/api', Authroutes, projroutes,msgroutes);

app.get('/profile', authenticateToken, (req, res) => {
    res.json(req.user);
});


const database = module.exports =()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect("mongodb://localhost:27017/first")
        // mongoose.connect("mongodb+srv://kashik:shareskill321@shareskilll.w8l807t.mongodb.net/maindb?retryWrites=true&w=majority")
        console.log("database connection successful");
    
    } catch (error) {
        console.log(error)
        console.log("database connection failed"); 
    }
}

database();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
exports.getProfile =(authenticateToken, (req, res) => {
    res.json(req.user);
});