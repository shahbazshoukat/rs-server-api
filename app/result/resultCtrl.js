const ResultManager = require('./resultManager');
const {
  ResultConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class ResultController {

  static async createResult (req, res) {

    try {

      const doc = await ResultManager.createResult(req.body);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: ResultConstants.MESSAGES.RESULT_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createResult:: Failed to create Result`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResultById (req, res) {

    try {

      const doc = await ResultManager.getResultById(req.params.resultId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getAllResults (req, res) {

    try {

      const doc = await ResultManager.getAllResults();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULTS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResultYears (req, res) {

    try {

      const doc = await ResultManager.getResultYears(req.params.sectionId, req.params.boardId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULTS_YEARS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getExamTypes (req, res) {

    try {

      const doc = await ResultManager.getExamTypes(req.params.sectionId, req.params.boardId, req.params.year);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULTS_YEARS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResult (req, res) {

    try {

      const doc = await ResultManager.getResult(req.params.section, req.params.domain, req.params.year, req.params.exam);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateResult (req, res) {

    try {

      const doc = await ResultManager.updateResult(req.params.resultId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteResult (req, res) {

    try {

      const doc = await ResultManager.deleteResult(req.params.resultId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateResultStatus (req, res) {

    try {

      const doc = await ResultManager.updateResultStatus(req.params.resultId, req.body.status);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_STATUS_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResultsByBoardKey (req, res) {

    try {

      const doc = await ResultManager.getResultsByBoardKey(req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResultsByBoardDomain (req, res) {

    try {

      const doc = await ResultManager.getResultsByBoardDomain(req.params.domain);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async findResult (req, res) {

    try {

      const doc = await ResultManager.findResult(req.params.section, req.params.board, req.params.year, req.params.exam, req.params.rollNo);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULT_FOUND_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`findResult:: Failed to find result, `, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async addComment (req, res) {

    try {

      const link = req.headers.referer;

      const data = await ResultManager.addComment(req.params.resultId, req.body, link);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_ADDED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async removeComment (req, res) {

    try {

      const data = await ResultManager.removeComment(req.params.resultId, req.params.commentId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_REMOVED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getLatestResults (req, res) {

    try {

      const doc = await ResultManager.getLatestResults();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULTS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getResultsBySectionAndBoard (req, res) {

    try {

      const doc = await ResultManager.getResultsBySectionAndBoard(req.params.sectionTitle, req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ResultConstants.MESSAGES.RESULTS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateAllResults (req, res) {

    try {

      const doc = await ResultManager.updateAllResults(req.body.section);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: 'Results successfully updated', data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = ResultController;
