const UserManager = require('./UserManager');

const {
  ErrorCodesConstants,
  ErrorMessagesConstants,
  UserConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class UserCtrl {

  static async createNewUser (req, res) {

    try {

      const data = await UserManager.createNewUser(req.body);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_ACCOUNT_SUCCESSFULLY_CREATED, data });

    } catch (error) {

      cLog.error(`createNewUser:: Failed to create User, data:: `, req.body, error);

      res.status(error.code || ErrorCodesConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || ErrorMessagesConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async loginUser (req, res) {

    try {

      const data = await UserManager.loginUser(req.headers['user-agent'], req.body.email, req.body.password);

      res.json({ success: true, message: UserConstants.MESSAGES.USER_LOGGED_IN_SUCCESSFULLY, data });

    } catch (error) {

      cLog.error(`loginUser:: Failed to login, email:: ${req.body.email}`, error);

      res.status(error.code || ErrorCodesConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || ErrorMessagesConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async logoutUser (req, res) {

    try {

      await UserManager.logoutUser(req.user);

      res.json({ success: true, message: UserConstants.MESSAGES.LOGGED_OUT_SUCCESSFULLY });

    } catch (error) {

      cLog.error(`logoutUser:: Failed to logout, `, req.user, error);

      res.status(error.code || ErrorCodesConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || ErrorMessagesConstants.MESSAGES.INTERNAL_SERVER_ERROR});

    }

  }

}

module.exports = UserCtrl;
