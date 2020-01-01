const express = require("express");

const router = express.Router();
const UsersController = require("../app/user/userCtrl");

router.post("/signup", UsersController.createUser);

router.post("/login", UsersController.loginUser);

router.post("/forgotpassword", UsersController.findUserByEmail);

router.put("/resetpassword", UsersController.resetPassword);

router.get("/user:id", UsersController.getUser);

router.get("/user", UsersController.getUsers);

module.exports = router;
