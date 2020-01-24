const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const UsersController = require('../app/user/UserCtrl');

router.post('/signUp', UsersController.createNewUser);

router.post('/login', UsersController.loginUser);

router.post('/logout', Auth.Authenticate, UsersController.logoutUser);

module.exports = router;
