const UserHandler = require('./UserHandler');
const UserUtil = require('./UserUtil');
const bcrypt = require('bcrypt-nodejs');
const useragent = require('useragent');

const ApplicationException = require('../../exceptions/ApplicationException');

const {
  UserEnums
} = require('../../enums');

const {
  HTTPStatusCodeConstants,
  UserConstants
} = require('../../constants');

const {
  cLog,
  tokens
} = require('../../helpers');

class UserManager {

  static async createNewUser (loggedInUser, data) {

    try {

      cLog.info(`createNewUser:: Creating new User account, data:: `, data);

      await UserUtil.validateParametersToCreateUser(data);

      await UserUtil.validateUser(loggedInUser);

      const eUser = await UserHandler.getUserByEmail(data.email);

      if (eUser) {

        cLog.error(`createNewUser:: This email:: ${data.email} is already taken`);

        throw new ApplicationException(UserConstants.MESSAGES.THIS_EMAIL_IS_ALREADY_TAKEN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      data.role = UserEnums.ROLE.USER;

      const user = await UserHandler.createNewUser(data);

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email
      };

      cLog.success(`createNewUser:: User account successfully created, email:: ${data && data.email}`);

      return userResponse;

    } catch (error) {

      cLog.error(`createNewUser:: Failed to create new User account, email:: ${data && data.email}`, error);

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
        name: user.name,
        email: user.email,
        role: user.role,
        token: userToken
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

      if (!user || !user.email) {

        cLog.error(`logoutUser:: Invalid User, `, user);

        throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const update = {
        $set: {
          lastToken: null
        }
      };

      await UserHandler.updateUserByEmail(user.email, update);

      cLog.success(`logoutUser:: User logged out successfully`);

    } catch (error) {

      cLog.error(`logoutUser:: Failed to logout User, `, user, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_LOGOUT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async getUserById (loggedInUser, userId) {

    try {

      await UserUtil.validateUserId(userId);

      await UserUtil.validateUser(loggedInUser);

      const doc = await UserHandler.getUserById(userId);

      if (!doc) {

        throw new ApplicationException(UserConstants.MESSAGES.USER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getUserById:: Failed to fetch user userId:: ${userId}`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_FIND_USER, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getUsers () {

    try {

      cLog.info(`getUsers:: Getting all users`);

      const users = await UserHandler.getUsers();

      cLog.success(`getUsers:: Users successfully fetched,`, users);

      return users;

    } catch (error) {

      cLog.error(~`getUsers:: Failed to get all users`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_FIND_USER, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async getAllUsers (loggedInUser) {

    try {

      cLog.info(`getAllUsers:: Getting all users`);

      await UserUtil.validateUser(loggedInUser);

      const users = await UserHandler.getUsers();

      cLog.success(`getAllUsers:: Users successfully fetched,`, users);

      return users;

    } catch (error) {

      cLog.error(~`getAllUsers:: Failed to get all users`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_FIND_USER, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async updateUserById (loggedInUser, userId, data) {

    try {

      await UserUtil.validateUserId(userId);

      await UserUtil.validateUser(loggedInUser);

      const user = await UserHandler.getUserById(userId);

      if (!user) {

        cLog.error(`updateUserById:: User not found`, user);

        throw new ApplicationException(UserConstants.MESSAGES.USER_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      if (user.role === UserEnums.ROLE.ADMIN) {

        cLog.error(`updateUserById:: User is an admin and can't be updated`, user);

        throw new ApplicationException(UserConstants.MESSAGES.OPERATION_NOT_ALLOWED, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      await UserUtil.validateParametersToUpdateUser(data);

      const update = {
        name: data.name,
        email: data.email
      };

      const doc = await UserHandler.updateUserById(userId, update);

      return doc;

    } catch (error) {

      cLog.error(`updateUserById:: Failed to update user userId:: ${userId} update:: `, data, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_UPDATE_USER, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async removeUserById (loggedInUser, userId) {

    try {

      await UserUtil.validateUserId(userId);

      await UserUtil.validateUser(loggedInUser);

      const user = await UserHandler.getUserById(userId);

      if (!user) {

        cLog.error(`removeUserById:: User not found`, user);

        throw new ApplicationException(UserConstants.MESSAGES.USER_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      if (user.role === UserEnums.ROLE.ADMIN) {

        cLog.error(`removeUserById:: User is an admin and can't be updated`, user);

        throw new ApplicationException(UserConstants.MESSAGES.OPERATION_NOT_ALLOWED, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const doc = await UserHandler.removeUserById(userId);

      return doc;

    } catch (error) {

      cLog.error(`removeUserById:: Failed to delete user userId:: ${userId}`, error);

      throw new ApplicationException(error.message || UserConstants.MESSAGES.FAILED_TO_REMOVE_USER, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = UserManager;
