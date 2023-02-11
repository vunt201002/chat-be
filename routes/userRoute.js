const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", userController.register);

router.post("/login", userController.loginUser);

router.post("/avatar/:id", userController.setAvatar);

router.get("/users/:id", userController.getAllUser);

module.exports = router;