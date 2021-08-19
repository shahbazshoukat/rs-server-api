const ApplicationException = require('../../exceptions/ApplicationException');
const ObjectId = require('mongoose').Types.ObjectId;

const {
  DateSheetConstants,
  BoardConstants,
  SectionConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  ResultEnums
} = require('../../enums');

const {
  validators
} = require('../../helpers');

class DateSheetUtil {

  static async validateParametersToCreateDateSheet (data) {

    if (!data) {

      throw new ApplicationException(DateSheetConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_DATE_SHEET, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

    if (!validators.isValidId(data.sectionId)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(data.boardId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetDateSheetYears (secId, boardId) {

    if (!validators.isValidId(secId)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(boardId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetExamTypes (secId, boardId, year) {

    if (!validators.isValidId(secId)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(boardId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(year)) {

      throw new ApplicationException(DateSheetConstants.MESSAGES.INVALID_YEAR, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateDateSheetId (dateSheetId) {

    if (!validators.isValidId(dateSheetId)) {

      throw new ApplicationException(DateSheetConstants.MESSAGES.INVALID_DATE_SHEET_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetDateSheet (sectionTitle, boardDomain, year, examType) {

    if (!validators.isValidStr(sectionTitle)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(boardDomain)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DOMAIN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(year)) {

      throw new ApplicationException(DateSheetConstants.MESSAGES.INVALID_YEAR, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(examType)) {

      throw new ApplicationException(DateSheetConstants.MESSAGES.INVALID_EXAM_TYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateBoardKey (boardKey) {

    if (!validators.isValidStr(boardKey)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_KEY, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateBoardDomain (domain) {

    if (!validators.isValidStr(domain)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DOMAIN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static getExamTypeText (examType) {

    if (Number(examType) === ResultEnums.EXAM_TYPES.ANNUAL) {

      return DateSheetConstants.EXAM_TYPES.ANNUAL;

    } else if (Number(examType) === ResultEnums.EXAM_TYPES.SUPPLY) {

      return DateSheetConstants.EXAM_TYPES.SUPPLY;

    } else if (Number(examType) === ResultEnums.EXAM_TYPES.TEST) {

      return DateSheetConstants.EXAM_TYPES.TEST;

    } else if (Number(examType) === ResultEnums.EXAM_TYPES.RETOTAL) {

      return DateSheetConstants.EXAM_TYPES.RETOTAL;

    }

  }

  static convertObjectIdToString (objectId) {

    try {

      const nid = new ObjectId(objectId);

      return nid.toString();

    } catch (e) {

      return null;

    }

  }

  static getDateSheetNameAndPageId (board, section, data) {

    if (!data || !board || !section) {

      return;

    }

    data.pageId = `date_sheet_for_${board.domain}_${section.title}_${DateSheetUtil.getExamTypeText(data.examType)}_exams_${data.year}`;

    data.title = `Date sheet for ${board && board.title} ${section.title} ${DateSheetUtil.getExamTypeText(data.examType)} exams ${data.year}`;

  }

}

module.exports = DateSheetUtil;
