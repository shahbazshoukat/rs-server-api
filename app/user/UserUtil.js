const ApplicationException = require('../../exceptions/ApplicationException');

const {
  UserEnums
} = require('../../enums');

const {
  HTTPStatusCodeConstants,
  UserConstants
} = require('../../constants');

const {
  cLog, validators
} = require('../../helpers');

class UserUtil {

  static validateParametersToCreateUser (data) {

    if (!data) {

      cLog.error(`validateParametersToCreateUser:: Invalid User data:: `, data);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.name)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User name, `, data.name);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_NAME, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.email)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User email, `, data.email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidPassword(data.password)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User password, `, data.password);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_PASSWORD, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToUpdateUser (data) {

    if (!data) {

      cLog.error(`validateParametersToUpdateUser:: Invalid User data:: `, data);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.name)) {

      cLog.error(`validateParametersToUpdateUser:: Invalid User name, `, data.name);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_NAME, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.email)) {

      cLog.error(`validateParametersToUpdateUser:: Invalid User email, `, data.email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserCredentials (email, password) {

    if (!validators.isValidStr(email)) {

      cLog.error(`validateUserCredentials:: Invalid User email:: `, email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(password)) {

      cLog.error(`validateUserCredentials:: Invalid password:: `, password);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_PASSWORD, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserId (id) {

    if (!validators.isValidId(id)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User id, `, id);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserEmail (email) {

    if (!validators.isValidStr(email)) {

      cLog.error(`validateUserCredentials:: Invalid User email:: `, email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUser (user) {

    if (!user || user.role !== UserEnums.ROLE.ADMIN) {

      cLog.error(`validateUser:: User is not an admin`, user);

      throw new ApplicationException(UserConstants.MESSAGES.OPERATION_NOT_ALLOWED, HTTPStatusCodeConstants.FORBIDDEN).toJson();

    }

  }

}

module.exports = UserUtil;
