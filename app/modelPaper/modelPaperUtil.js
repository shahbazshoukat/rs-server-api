const ApplicationException = require('../../exceptions/ApplicationException');
const ObjectId = require('mongoose').Types.ObjectId;

const {
  ModelPaperConstants,
  BoardConstants,
  SectionConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  validators
} = require('../../helpers');

class ModelPaperUtil {

  static async validateParametersToCreateModelPaper (data) {

    if (!data) {

      throw new ApplicationException(ModelPaperConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_MODEL_PAPER, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

    if (!validators.isValidId(data.sectionId)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidId(data.boardId)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateModelPaperId (dateSheetId) {

    if (!validators.isValidId(dateSheetId)) {

      throw new ApplicationException(ModelPaperConstants.MESSAGES.INVALID_MODEL_PAPER_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static validateParametersToGetModelPaper (sectionTitle, boardDomain, subject) {

    if (!validators.isValidStr(sectionTitle)) {

      throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(boardDomain)) {

      throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DOMAIN, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(subject)) {

      throw new ApplicationException(ModelPaperConstants.MESSAGES.INVALID_SUBJECT, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

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

  static convertObjectIdToString (objectId) {

    try {

      const nid = new ObjectId(objectId);

      return nid.toString();

    } catch (e) {

      return null;

    }

  }

  static getModelPaperNameAndPageId (board, section, data) {

    if (!data || !board || !section) {

      return;

    }

    data.pageId = `${board.title.replace(' ', '_')}_${section.title}_${data.subject}`;

    data.title = `Model paper for ${board && board.title} ${section.title} ${data.subject}`;

    data.filename = `Model_Paper_For_${board && board.title.replace(' ', '_')}_${section.title}_${data.subject}`;

  }

}

module.exports = ModelPaperUtil;
