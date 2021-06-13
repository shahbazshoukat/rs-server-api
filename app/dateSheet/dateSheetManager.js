const DateSheetHandler = require('./dateSheetHandler');
const SectionManager = require('../section/sectionManager');
const BoardManager = require('../board/boardManager');
const DateSheetUtil = require('./dateSheetUtil');
const CommentManager = require('../comment/CommaneManager');
const mailer = require('../utils/mailer');
const UserManager = require('../user/UserManager');
const FbHelper = require('../utils/socialMediaUtil');
const GoogleDriveHandler = require('../utils/googleDriveAPI');

const ApplicationException = require('../../exceptions/ApplicationException');
const {
  DateSheetConstants,
  HTTPStatusCodeConstants,
  CommentConstants,
  BoardConstants,
  SectionConstants
} = require('../../constants');

const {
  ResultEnums
} = require('../../enums');

const {
  cLog,
  config,
  storage
} = require('../../helpers');

class DateSheetManager {

  static async createDateSheet (data, file) {

    try {

      data = JSON.parse(data);

      cLog.info(`createDateSheet:: Creating new date sheet`, data, `file:: `, file);

      await DateSheetUtil.validateParametersToCreateDateSheet(data);

      const board = await BoardManager.getBoard(data.boardId);

      DateSheetUtil.getDateSheetNameAndPageId(board, data);

      cLog.info(`createDateSheet:: Checking if date sheet already exists`);

      const res = await DateSheetHandler.getDateSheetByPageId(data.pageId);

      if (res) {

        cLog.error(`createDateSheet:: Date sheet already added`, data);

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_ALREADY_ADDED, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      file.filename = data.pageId;

      const fileResponse = await GoogleDriveHandler.uploadFile(file, board.dateSheetDir);

      cLog.info(`response from Google Drive file upload API:: `, fileResponse.data);

      if (!fileResponse || !fileResponse.data) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.FAILED_TO_ADD_DATE_SHEET, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const publicUrlResponse = await GoogleDriveHandler.generatePublicUrl(fileResponse.data.id);

      cLog.info(`response from Google Drive public url API:: `, publicUrlResponse.data);

      if (!publicUrlResponse || !publicUrlResponse.data) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.FAILED_TO_ADD_DATE_SHEET, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      data.viewUrl = publicUrlResponse.data.webViewLink;

      data.downloadUrl = publicUrlResponse.data.webContentLink;

      data.fileId = fileResponse.data.id;

      const dateSheet = await DateSheetHandler.createDateSheet(data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      cLog.success(`createDateSheet:: Date sheet successfully created, data:: `, data, `file:: `, file);

      return dateSheet;

    } catch (error) {

      cLog.error(`createDateSheet:: Failed to create Date sheet data:: `, data, `file:: `, file, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.FAILED_TO_ADD_DATE_SHEET, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetById (dateSheetId) {

    try {

      await DateSheetUtil.validateDateSheetId(dateSheetId);

      const dateSheet = await DateSheetHandler.getDateSheetById(dateSheetId);

      if (!dateSheet) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return dateSheet;

    } catch (error) {

      cLog.error(`getDateSheetById:: Failed to fetch date sheet dateSheetId:: ${dateSheetId}`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllDateSheets () {

    try {

      const dateSheets = await DateSheetHandler.getAllDateSheets();

      if (!dateSheets) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return dateSheets;

    } catch (error) {

      cLog.error(`getAllDateSheets:: Failed to fetch date sheets`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetYears (secId, boardId) {

    try {

      cLog.info(`getDateSheetYears:: getting date sheet years section title:: ${secId} boardKey:: ${boardId}`);

      await DateSheetUtil.validateParametersToGetDateSheetYears(secId, boardId);

      cLog.info(`getDateSheetYears:: getting date sheet years section id:: ${secId} board id:: ${boardId}`);

      const dateSheets = await DateSheetHandler.getDateSheetYears(secId, boardId);

      cLog.success(`getDateSheetYears:: Successfully get date sheet years section id:: ${secId} board id:: ${boardId} years:: `);

      return dateSheets;

    } catch (error) {

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.FAILED_TO_FETCH_YEARS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getExamTypes (secId, boardId, year) {

    try {

      cLog.info(`getExamTypes:: getting exam types section id:: ${secId} board id:: ${boardId} year:: ${year}`);

      await DateSheetUtil.validateParametersToGetExamTypes(secId, boardId, year);

      cLog.info(`getExamTypes:: getting exam section id:: ${secId} board id:: ${boardId} year:: ${year}`);

      const doc = await DateSheetHandler.getExamTypes(secId, boardId, year);

      cLog.success(`getExamTypes:: Successfully get exam types section id:: ${secId} board id:: ${boardId} year:: ${year}`, doc);

      return doc;

    } catch (error) {

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.FAILED_TO_FETCH_EXAM_TYPES, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetsByBoardKey (boardKey) {

    try {

      cLog.info(`getDateSheetsByBoardKey:: getting date sheet by boardKey:: ${boardKey}`);

      await DateSheetUtil.validateBoardKey(boardKey);

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getDateSheetsByBoardKey:: getting date sheets by board id:: ${board._id}`);

      const dateSheets = await DateSheetHandler.getDateSheetsByBoardId(board._id);

      if (!dateSheets) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getDateSheetsByBoardKey:: Successfully get date sheet by board id:: ${board._id}`);

      return {
        dateSheets,
        board
      };

    } catch (error) {

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetsByBoardDomain (domain) {

    try {

      cLog.info(`getDateSheetsByBoardDomain:: getting date sheets by board domain:: ${domain}`);

      await DateSheetUtil.validateBoardDomain(domain);

      const board = await BoardManager.getBoardByDomain(domain);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getDateSheetsByBoardDomain:: getting date sheets by board id:: ${board._id}`);

      const dateSheets = await DateSheetHandler.getDateSheetsByBoardId(board._id);

      if (!dateSheets) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getDateSheetsByBoardDomain:: Successfully get date sheets by board id:: ${board._id}`);

      return {
        dateSheets,
        board
      };

    } catch (error) {

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheet (sectionTitle, boardDomain, year, examType) {

    try {

      cLog.info(`getDateSheet:: Getting date sheets section:: ${sectionTitle} board:: ${boardDomain} year:: ${year} examtype:: ${examType}`);

      await DateSheetUtil.validateParametersToGetDateSheet(sectionTitle, boardDomain, year, examType);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      const board = await BoardManager.getBoardByDomain(boardDomain);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      if (examType === DateSheetConstants.EXAM_TYPES.ANNUAL) {

        examType = ResultEnums.EXAM_TYPES.ANNUAL;

      } else if (examType === DateSheetConstants.EXAM_TYPES.SUPPLY) {

        examType = ResultEnums.EXAM_TYPES.SUPPLY;

      } else if (examType === DateSheetConstants.EXAM_TYPES.TEST) {

        examType = ResultEnums.EXAM_TYPES.TEST;

      } else {

        cLog.error(`getDateSheet:: Invalid Exam type section:: ${sectionTitle} board:: ${boardDomain} year:: ${year} examtype:: ${examType}`);

        throw new ApplicationException(DateSheetConstants.MESSAGES.INVALID_EXAM_TYPE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      cLog.info(`getDateSheet:: getting date sheets section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`);

      const dateSheet = await DateSheetHandler.getDateSheet([section._id], board._id, year, examType);

      cLog.success(`getDateSheet:: Successfully get date sheets section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`, dateSheet);

      if (!dateSheet) {

        cLog.error(`getDateSheet:: Date Sheet not found section:: ${sectionTitle} board:: ${boardDomain} year:: ${year} examtype:: ${examType}`);

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await DateSheetHandler.updateDateSheetById(dateSheet._id, { $inc: { views: 1 } });

      await BoardManager.updateBoardById(board._id, { $inc: { views: 1 } });

      return dateSheet;

    } catch (error) {

      cLog.error(`getDateSheet:: Failed to fetch Date sheet, section:: ${sectionTitle} board:: ${boardDomain} year:: ${year} examtype:: ${examType}`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetByTitle (title) {

    try {

      cLog.info(`getDateSheetByTitle:: Getting date sheet by title:: ${title}`);

      const dateSheet = await DateSheetHandler.getDateSheetByPageId(title);

      if (!dateSheet) {

        cLog.error(`getDateSheetByTitle:: Date Sheet not found title:: ${title}`);

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getDateSheetByTitle:: Date successfully fetched with title:: ${title}`);

      return dateSheet;

    } catch (error) {

      cLog.error(`getDateSheetByTitle:: Failed to fetch Date sheet, title:: ${title}`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getDateSheetsBySectionAndBoard (sectionTitle, boardKey) {

    try {

      cLog.info(`getDateSheetsBySectionAndBoard:: Getting date sheets by section::${sectionTitle} and board:: ${boardKey}`);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        cLog.error(`getDateSheetsBySectionAndBoard:: Section:: ${sectionTitle} not found`);

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        cLog.error(`getDateSheetsBySectionAndBoard:: Board:: ${boardKey} not found`);

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const datesheets = await DateSheetHandler.getDateSheetsBySectionAndBoard(section._id, board._id);

      cLog.success(`getDateSheetsBySectionAndBoard:: Date sheets successfully fetched by section::${sectionTitle} and board:: ${boardKey}`);

      return datesheets;

    } catch (error) {

      cLog.error(`getDateSheetsBySectionAndBoard:: Failed to get date sheets by section and board`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEETS_FETCHED_SUCCESSFULLY, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateDateSheet (dateSheetId, data) {

    try {

      await DateSheetUtil.validateDateSheetId(dateSheetId);

      await DateSheetUtil.validateParametersToCreateDateSheet(data);

      const doc = await DateSheetHandler.updateDateSheet(dateSheetId, data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      return doc;

    } catch (error) {

      cLog.error(`updateDateSheet:: Failed to update date sheet dateSheetId:: ${dateSheetId} update:: `, data, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.FAILED_TO_UPDATE_DATE_SHEET, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteDateSheet (dateSheetId) {

    try {

      await DateSheetUtil.validateDateSheetId(dateSheetId);

      const dateSheet = await DateSheetHandler.getDateSheetById(dateSheetId);

      cLog.info(`deleteDateSheet:: Deleting date sheet: ${dateSheetId}`, dateSheet);

      if (!dateSheet) {

        throw new ApplicationException(DateSheetConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await GoogleDriveHandler.deleteFile(dateSheet.fileId);

      const doc = await DateSheetHandler.deleteDateSheet(dateSheetId);

      return doc;

    } catch (error) {

      cLog.error(`deleteDateSheet:: Failed to delete date sheet dateSheetId:: ${dateSheetId}`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.FAILED_TO_DELETE_DATE_SHEET, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async addComment (dateSheetId, data, link) {

    try {

      cLog.info(`AddComment:: Adding new comment to date sheet:: ${dateSheetId} link:: ${link}`, data);

      await DateSheetUtil.validateDateSheetId(dateSheetId);

      const comment = await CommentManager.addComment(data, link);

      const update = {
        $push: {
          comments: comment._id
        }
      };

      await DateSheetHandler.updateDateSheetById(dateSheetId, update);

      const users = await UserManager.getUsers();

      for (const user of users) {

        if (user && user.email) {

          try {

            cLog.info(`addComment:: Sending comment email`);

            await mailer.sendCommentEmail(user, link, data);

          } catch (error) {

            cLog.error(`addComment:: Failed to send comment email`, error);

          }

        }

      }

      cLog.success(`addComment:: Comment successfully added to dateSheetId:: ${dateSheetId} link:: ${link}, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment to dateSheetId:: ${dateSheetId} link:: ${link}, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (dateSheetId, commentId) {

    try {

      cLog.info(`removeComment:: Removing new comment from dateSheetId:: ${dateSheetId}`, commentId);

      await DateSheetUtil.validateDateSheetId(dateSheetId);

      const comment = await CommentManager.removeComment(commentId);

      const update = {
        $pull: {
          comments: commentId
        }
      };

      await DateSheetHandler.updateDateSheetById(dateSheetId, update);

      cLog.success(`removeComment:: Comment successfully removed from dateSheetId:: ${dateSheetId}, `, commentId);

      return comment;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment from dateSheetId:: ${dateSheetId}, `, commentId, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async getLatestDateSheets () {

    try {

      cLog.info(`getLatestDateSheets:: Getting latest date sheets`);

      const data = await DateSheetHandler.getLatestDateSheets();

      cLog.success(`getLatestDateSheets:: Latest date sheets successfully fetched`);

      return data;

    } catch (error) {

      cLog.error(`getLatestDateSheets:: Failed to get latest date sheets`, error);

      throw new ApplicationException(error.message || DateSheetConstants.MESSAGES.DATE_SHEETS_FETCHED_SUCCESSFULLY, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = DateSheetManager;
