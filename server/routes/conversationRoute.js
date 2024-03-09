const express = require("express");
const router = express.Router();
const converController = require("../controllers/converController");

router.post('/conversation', converController.conversations);
router.get('/conversation/:userId', converController.getconversations);
router.post('/message',converController.messages);
router.get('/message/:conversationId', converController.getmessages);
router.get('/users', converController.getusers);
module.exports = router;
