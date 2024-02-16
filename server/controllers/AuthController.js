const UserModel= require("../models/user");
const SkillModel = require("../models/Skill");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




exports.checkUniqueName = async (req, res) => {
    const {name}  = req.body;
    try {
        // Check if username already exists
        const existingUser = await UserModel.findOne({ name: name });
        if (existingUser) {
            return res.json({ isUnique: false });
        }
        // If username is unique, respond with isUnique=true
        return res.json({ isUnique: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Implementation of /checkUniqueName route
};

exports.register = async (req, res) => {
    const { name, email, pass, skills, bio, image } = req.body;
    try {
        const existingUser = await UserModel.findOne({ name: name });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(pass, 10);
        
        const newUser = new UserModel({ name, email, pass: hashedPassword,Skills: JSON.parse(skills), bio, profile: image});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Implementation of /register route
};

exports.login = async (req, res) => {
    const{email,pass}= req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(pass, user.pass);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id,name: user.name,email:user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });

};

exports.addSkill = async (req, res) => {
    const { skill } = req.body;
    try {
        
        const newSkill = new SkillModel({ skill});
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Implementation of /skill route
};

exports.getSkills = async (req, res) => {
    try {
        const skills = await SkillModel.find();
        const skl=[]
        for (const [key, value] of Object.entries(skills)){
            skl.push(value["skill"])
        }
        
        res.json({ skills});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // Implementation of /getSkills route
};
