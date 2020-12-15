const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const UsersCtrl = require('../app/user/UserCtrl');

router.post('/signUp', Auth.Authenticate, UsersCtrl.createNewUser);

router.post('/login', UsersCtrl.loginUser);

router.get('/logout', Auth.Authenticate, UsersCtrl.logoutUser);

router.get('/users', Auth.Authenticate, UsersCtrl.getAllUsers);

router.get('/user/:userId', Auth.Authenticate, UsersCtrl.getUserById);

router.put('/user/:userId/update', Auth.Authenticate, UsersCtrl.updateUserById);

router.delete('/user/:userId/delete', Auth.Authenticate, UsersCtrl.removeUserById);

module.exports = router;
