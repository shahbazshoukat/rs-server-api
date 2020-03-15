const ApplicationException = require('../../exceptions/ApplicationException');

const {
  ResultConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog,
  validators,
  restClient
} = require('../../helpers');

class ResultUtil {

  static async validateParametersToCreateResult (data) {

    if (!data) {

      throw new ApplicationException(ResultConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_RESULT, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

    if (!validators.isValidId(data.sectionId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(data.boardId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetResultYears (secId, boardId) {

    if (!validators.isValidId(secId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(boardId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetExamTypes (secId, boardId, year) {

    if (!validators.isValidId(secId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(boardId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(year)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_YEAR, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateResultId (resultId) {

    if (!validators.isValidId(resultId)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_RESULT_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetResult (sectionTitle, boardKey, year, examType) {

    if (!validators.isValidStr(sectionTitle)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_SECTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(boardKey)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(year)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_YEAR, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(examType)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_EXAM_TYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateRollNo (rollNo) {

    if (!validators.isValidStr(rollNo)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_ROLL_NO, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateBoardKey (boardKey) {

    if (!validators.isValidStr(boardKey)) {

      throw new ApplicationException(ResultConstants.MESSAGES.INVALID_BOARD, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async findResult (board, result, rollNo) {

    try {

      cLog.info(`findResult:: finding result of rollNo:: ${rollNo} from ${result.apiUrl}`);

    } catch (error) {

      cLog.error(`findResult:: Failed to find result, board:: ${board} rollNo:: ${rollNo} resultApi:: ${result.apiUrl}`, error);

      throw new ApplicationException(ResultConstants.MESSAGES.SOMETHING_WENT_WRONG, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

  }

  static async checkBlockedWebsite (url) {

    try {

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

module.exports = ResultUtil;
