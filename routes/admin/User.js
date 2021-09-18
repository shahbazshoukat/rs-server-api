const express = require('express');

const router = express.Router();
const UsersCtrl = require('../../app/user/UserCtrl');

router.post('/signUp', UsersCtrl.createNewUser);

router.get('/logout', UsersCtrl.logoutUser);

router.get('/users', UsersCtrl.getAllUsers);

router.get('/user/:userId', UsersCtrl.getUserById);

router.put('/user/:userId/update', UsersCtrl.updateUserById);

router.delete('/user/:userId/delete', UsersCtrl.removeUserById);

module.exports = router;
