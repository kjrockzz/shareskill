const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post('/checkUniqueName', AuthController.checkUniqueName);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/skill', AuthController.addSkill);
router.get('/getSkills', AuthController.getSkills);
router.get('/getuser/:userId', AuthController.user);
module.exports = router;
