const DateSheetManager = require('./dateSheetManager');
const {
  DateSheetConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

const uploadFile = require('../../middleware/Upload');

class DateSheetCtrl {

  static async createDateSheet (req, res) {

    try {

      await uploadFile(req, res);

      const doc = await DateSheetManager.createDateSheet(req.body && req.body.data, req.file);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEET_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createDateSheet:: Failed to create date sheet`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetById (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetById(req.params.dateSheetId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEET_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getAllDateSheets (req, res) {

    try {

      const doc = await DateSheetManager.getAllDateSheets();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEETS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetYears (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetYears(req.params.sectionId, req.params.boardId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEETS_YEARS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getExamTypes (req, res) {

    try {

      const doc = await DateSheetManager.getExamTypes(req.params.sectionId, req.params.boardId, req.params.year);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheet (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheet(req.params.section, req.domain, req.params.year, req.params.exam);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateDateSheet (req, res) {

    try {

      const doc = await DateSheetManager.updateDateSheet(req.params.dateSheetId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEET_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteDateSheet (req, res) {

    try {

      const doc = await DateSheetManager.deleteDateSheet(req.params.dateSheetId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: DateSheetConstants.MESSAGES.DATE_SHEET_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetsByBoardKey (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetsByBoardKey(req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetsByBoardDomain (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetsByBoardDomain(req.params.domain);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async addComment (req, res) {

    try {

      const link = req.headers.referer;

      const data = await DateSheetManager.addComment(req.params.dateSheetId, req.body, link);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_ADDED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async removeComment (req, res) {

    try {

      const data = await DateSheetManager.removeComment(req.params.dateSheetId, req.params.commentId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_REMOVED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getLatestDateSheets (req, res) {

    try {

      const doc = await DateSheetManager.getLatestDateSheets();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetsBySectionAndBoard (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetsBySectionAndBoard(req.params.sectionTitle, req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getDateSheetByTitle (req, res) {

    try {

      const doc = await DateSheetManager.getDateSheetByTitle(req.domain, req.params.title);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = DateSheetCtrl;
