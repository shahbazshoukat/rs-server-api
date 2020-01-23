const ApplicationException = require('../../exceptions/ApplicationException');

const {
  ErrorCodesConstants,
  UserConstants
} = require('../../constants');

const {
  cLog, validators
} = require('../../helpers');

class UserUtil {

  static validateParametersToCreateUser (data) {

    if (!data) {

      cLog.error(`validateParametersToCreateUser:: Invalid User data:: `, data);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.name)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User name, `, data.name);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_NAME, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.email)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User email, `, data.email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidPassword(data.password)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User password, `, data.password);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_PASSWORD, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserCredentials (email, password) {

    if (!validators.isValidStr(email)) {

      cLog.error(`validateUserCredentials:: Invalid User email:: `, email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(password)) {

      cLog.error(`validateUserCredentials:: Invalid password:: `, password);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_PASSWORD, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserId (id) {

    if (!validators.isValidId(id)) {

      cLog.error(`validateParametersToCreateUser:: Invalid User id, `, id);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_ID, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUserEmail (email) {

    if (!validators.isValidStr(email)) {

      cLog.error(`validateUserCredentials:: Invalid User email:: `, email);

      throw new ApplicationException(UserConstants.MESSAGES.INVALID_USER_EMAIL, ErrorCodesConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = UserUtil;
