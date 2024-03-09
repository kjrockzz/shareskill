const express = require("express");
const router = express.Router();
const projController = require("../controllers/projController");

router.post('/newProj', projController.upload);

router.get('/allProj/user', projController.getproj);

module.exports = router;
