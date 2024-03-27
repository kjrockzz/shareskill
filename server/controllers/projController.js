const UserModel= require("../models/user");
const SkillModel = require("../models/Skill");
const projectModel = require("../models/projects");

exports.upload=async (req, res) => {
    const { name,desc,admin ,skills,adminpic} = req.body;
    try {
        
        const newProject = new projectModel({ projectName:name,skillReq: skills ,desc,admin,adminpic, status: "0"});
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getproj = async (req, res) => {
    try {
        const project = await projectModel.find();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
};
  