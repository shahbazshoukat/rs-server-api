const UserManager = require('./UserManager');

const {
  HTTPStatusCodeConstants,
  UserConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class UserCtrl {

  static async createNewUser (req, res) {

    try {

      const data = await UserManager.createNewUser(req.user, req.body);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_ACCOUNT_SUCCESSFULLY_CREATED, data });

    } catch (error) {

      cLog.error(`createNewUser:: Failed to create User, data:: `, req.body, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async loginUser (req, res) {

    try {

      const data = await UserManager.loginUser(req.headers['user-agent'], req.body.email, req.body.password);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_LOGGED_IN_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`loginUser:: Failed to login, email:: ${req.body.email}`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async logoutUser (req, res) {

    try {

      await UserManager.logoutUser(req.user);

      res.json({ success: true, message: UserConstants.MESSAGES.LOGGED_OUT_SUCCESSFULLY });

    } catch (error) {

      cLog.error(`logoutUser:: Failed to logout, `, req.user, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR });

    }

  }

  static async getUserById (req, res) {

    try {

      const data = await UserManager.getUserById(req.user, req.params.userId);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_FETCHED_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`getUserById:: Failed to get User, `, req.user, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR });

    }

  }

  static async getAllUsers (req, res) {

    try {

      const data = await UserManager.getAllUsers(req.user);

      res.json({ success: true, message: UserConstants.MESSAGES.USERS_FETCHED_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`getAllUsers:: Failed to fetch users, `, req.user, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR });

    }

  }

  static async updateUserById (req, res) {

    try {

      const data = await UserManager.updateUserById(req.user, req.params.userId, req.body);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_UPDATED_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`updateUserById:: Failed to update user, `, req.user, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR });

    }

  }

  static async removeUserById (req, res) {

    try {

      const data = await UserManager.removeUserById(req.user, req.params.userId);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_REMOVED_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`removeUserById:: Failed to remove user, `, req.user, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR });

    }

  }

}

module.exports = UserCtrl;
