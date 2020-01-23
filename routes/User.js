const express = require('express');

const router = express.Router();
const UsersController = require('../app/user/UserCtrl');

router.post('/signUp', UsersController.createNewUser);

router.post('/login', UsersController.loginUser);

router.post('/logout', UsersController.logoutUser);

module.exports = router;
