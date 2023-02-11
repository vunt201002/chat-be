const messageController = require("../controllers/messageController");
const router = require("express").Router();

router.post("/msg", messageController.addMessage);
router.get("/msg", messageController.getMessages);

module.exports = router;