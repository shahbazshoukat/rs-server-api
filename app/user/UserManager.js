const UserHandler = require('./UserHandler');
const UserUtil = require('./UserUtil');
const bcrypt = require('bcrypt-nodejs');
const useragent = require('useragent');

const ApplicationException = require('../../exceptions/ApplicationException');

const {
  HTTPStatusCodeConstants,
  UserConstants
} = require('../../constants');

const {
  cLog,
  tokens
} = require('../../helpers');

class UserManager {

  static async createNewUser (data) {

    try {

      cLog.info(`createNewUser:: Creating new User account, data:: `, data);

      await UserUtil.validateParametersToCreateUser(data);

      const eUser = await UserHandler.getUserByEmail(data.email);

      if (eUser) {

        cLog.error(`createNewUser:: This email:: ${data.email} is already taken`);

        throw new ApplicationException(UserConstants.MESSAGES.THIS_EMAIL_IS_ALREADY_TAKEN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const user = await UserHandler.createNewUser(data);

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        domain: user.domain
      };

      cLog.success(`createNewUser:: User account successfully created, email:: ${data.email}`);

      return userResponse;

    } catch (error) {

      cLog.error(`createNewUser:: Failed to create new User account, email:: ${data.email}`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_CREATE_USER_ACCOUNT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async loginUser (ua, email, password) {

    try {

      cLog.info(`loginUser:: Logging in User, email:: ${email}`);

      await UserUtil.validateUserCredentials(email, password);

      const user = await UserHandler.getUserByEmail(email);

      if (!user) {

        cLog.error(`loginUser:: No User found with email:: ${email}`);

        throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_CREDENTIALS, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const isValidPass = await bcrypt.compareSync(password, user.password);

      if (!isValidPass) {

        cLog.error(`loginUser:: Invalid credentials, email:: ${email}`);

        throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_CREDENTIALS, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const uagent = useragent.parse(ua).toString();

      const userToken = tokens.getLoginToken(user, uagent.toString());

      const update = {
        $set: {
          lastToken: userToken
        }
      };

      await UserHandler.updateUserById(user._id, update);

      const userResponse = {
        userId: user._id,
        name: user.name,
        email: user.email,
        token: userToken,
        expiresIn: 3600
      };

      cLog.success(`loginUser:: User successfully logged in, User:: `, userResponse);

      return userResponse;

    } catch (error) {

      cLog.error(`loginUser:: Failed to login User, email:: ${email}`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.INVALID_USER_CREDENTIALS, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async logoutUser (user) {

    try {

      cLog.info(`logoutUser:: logging out User, `, user);

      if (!user || !user._id) {

        cLog.error(`logoutUser:: Invalid User, `, user);

        throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const update = {
        $set: {
          lastToken: null
        }
      };

      await UserHandler.updateUserById(user._id, update);

      cLog.success(`logoutUser:: User logged out successfully`);

    } catch (error) {

      cLog.error(`logoutUser:: Failed to logout User, `, user, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_LOGOUT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = UserManager;
