const ApplicationException = require('../../exceptions/ApplicationException');

const {
  UserEnums
} = require('../../enums');

const {
  UserConstants,
  BoardConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog,
  validators,
  restClient
} = require('../../helpers');

class BoardUtil {

  static async validateParametersToCreateBoard (data) {

    if (!data) {

      throw new ApplicationException(BoardConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_BOARD, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

    if (!validators.isValidStr(data.title)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (data.description && !validators.isValidStr(data.description)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DESCRIPTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.province)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_PROVINCE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.city)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_CITY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.webUrl)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_WEB_URL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.resultUrl)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_RESULT_URL, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.domain)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DOMAIN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateBoardId (boardId) {

    if (!validators.isValidId(boardId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateBoardKey (boardKey) {

    if (!validators.isValidStr(boardKey)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateBoardDomain (domain) {

    if (!validators.isValidStr(domain)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DOMAIN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateSectionId (sectionId) {

    if (!validators.isValidId(sectionId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateProvince (province) {

    if (!validators.isValidStr(province)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_PROVINCE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateUser (user) {

    if (!user || user.role !== UserEnums.ROLE.ADMIN) {

      cLog.error(`validateUser:: User is not an admin`, user);

      throw new ApplicationException(UserConstants.MESSAGES.OPERATION_NOT_ALLOWED, HTTPStatusCodeConstants.FORBIDDEN).toJson();

    }

  }

  static async checkBlockedWebsite (url) {

    try {

      cLog.info(`checkBlockedWebsite:: Checking if url blocked`);

      const resultRes = await restClient.get(url);

      if (resultRes && resultRes.headers && (resultRes.headers['x-frame-options'] || resultRes.headers['X-FRAME-OPTIONS'] || resultRes.headers['X-Frame-Options'])) {

        return true;

      }

      return false;

    } catch (error) {

      cLog.error(`checkBlockedWebsite:: Error :: `, error);

      return true;

    }

  }

}

module.exports = BoardUtil;
