const ResultHandler = require('./resultHandler');
const SectionManager = require('../section/sectionManager');
const BoardManager = require('../board/boardManager');
const ResultUtil = require('./resultUtil');
const CommentManager = require('../comment/CommaneManager');

const ApplicationException = require('../../exceptions/ApplicationException');
const {
  ResultConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  ResultEnums
} = require('../../enums');

const {
  cLog,
  restClient
} = require('../../helpers');

class ResultManager {

  static async createResult (data) {

    try {

      await ResultUtil.validateParametersToCreateResult(data);

      data.isBlocked = false;

      const resultRes = await restClient.get(data.resultUrl);

      if (resultRes && resultRes.headers && (resultRes.headers['x-frame-options'] || resultRes.headers['X-FRAME-OPTIONS'])) {

        data.isBlocked = true;

      }

      const doc = await ResultHandler.createResult(data);

      return doc;

    } catch (error) {

      cLog.error(`createResult:: Failed to create Result data:: `, data, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_ADD_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getResultById (resultId) {

    try {

      await ResultUtil.validateResultId(resultId);

      const doc = await ResultHandler.getResultById(resultId);

      if (!doc) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getResult:: Failed to fetch Result ResultId:: ${resultId}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULT_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllResults () {

    try {

      const doc = await ResultHandler.getAllResults();

      if (!doc) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getAllResults:: Failed to fetch Results`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getResultYears (secTitle, boardKey) {

    try {

      cLog.info(`getResultYears:: getting result years section title:: ${secTitle} boardKey:: ${boardKey}`);

      await ResultUtil.validateParametersToGetResultYears(secTitle, boardKey);

      const section = await SectionManager.getSectionByTitle(secTitle);

      if (!section || !section._id) {

        throw new ApplicationException(ResultConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        throw new ApplicationException(ResultConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getResultYears:: getting result years section id:: ${section._id} board id:: ${board._id}`);

      const doc = await ResultHandler.getResultYears(section._id, board._id);

      if (!doc) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getResultYears:: Successfully get result years section id:: ${section._id} board id:: ${board._id} years:: `);

      return doc;

    } catch (error) {

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_FETCH_YEARS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getResultsByBoardKey (boardKey) {

    try {

      cLog.info(`getResultYears:: getting result by boardKey:: ${boardKey}`);

      await ResultUtil.validateBoardKey(boardKey);

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        throw new ApplicationException(ResultConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getResultYears:: getting results by board id:: ${board._id}`);

      const doc = await ResultHandler.getResultsByBoardId(board._id);

      if (!doc) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getResultYears:: Successfully get results by board id:: ${board._id}`);

      return doc;

    } catch (error) {

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getResult (sectionTitle, boardKey, year, examType) {

    try {

      cLog.info(`getResult:: Getting result section:: ${sectionTitle} board:: ${boardKey} year:: ${year} examtype:: ${examType}`);

      await ResultUtil.validateParametersToGetResult(sectionTitle, boardKey, year, examType);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        throw new ApplicationException(ResultConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        throw new ApplicationException(ResultConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      examType = examType === ResultConstants.EXAM_TYPES.ANNUAL ? ResultEnums.EXAM_TYPES.ANNUAL : ResultEnums.EXAM_TYPES.SUPPLY;

      cLog.info(`getResult:: getting result section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`);

      const doc = await ResultHandler.getResult(section._id, board._id, year, examType);

      if (!doc || !doc.resultUrl) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await ResultHandler.updateResultById(doc._id, { $inc: { views: 1 } });

      cLog.success(`getResult:: Successfuly get result section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`);

      return doc;

    } catch (error) {

      cLog.error(`getResult:: Failed to fetch result section:: ${sectionTitle} board:: ${boardKey} year:: ${year} examtype:: ${examType}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateResult (resultId, data) {

    try {

      await ResultUtil.validateResultId(resultId);

      await ResultUtil.validateParametersToCreateResult(data);

      const doc = await ResultHandler.updateResult(resultId, data);

      return doc;

    } catch (error) {

      cLog.error(`updateResult:: Failed to update Result ResultId:: ${resultId} update:: `, data, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_UPDATE_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteResult (resultId) {

    try {

      await ResultUtil.validateResultId(resultId);

      const doc = await ResultHandler.deleteResult(resultId);

      return doc;

    } catch (error) {

      cLog.error(`deleteResult:: Failed to delete Result ResultId:: ${resultId}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_DELETE_RESULT, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateResultStatus (resultId, status) {

    try {

      cLog.info(`updateResultStatus:: updating result status resultId:: ${resultId} status:: ${status}`);

      await ResultUtil.validateResultId(resultId);

      const doc = await ResultHandler.updateResultStatus(resultId, status);

      cLog.success(`updateResultStatus:: result status updated successfully resultId:: ${resultId} status:: ${status}`);

      return doc;

    } catch (error) {

      cLog.error(`deleteResult:: Failed to update Result status ResultId:: ${resultId} status:: ${status}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_UPDATE_RESULT_STATUS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async addComment (resultId, data) {

    try {

      cLog.info(`AddComment:: Adding new comment`, data);

      await ResultUtil.validateResultId(resultId);

      const comment = await CommentManager.addComment(data);

      const update = {
        $push: {
          comments: comment._id
        }
      };

      await ResultHandler.updateResultById(resultId, update);

      cLog.success(`addComment:: Comment successfully added, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (resultId, commentId) {

    try {

      cLog.info(`removeComment:: Removing new comment`, commentId);

      await ResultUtil.validateResultId(resultId);

      const comment = await CommentManager.removeComment(commentId);

      const update = {
        $pull: {
          comments: commentId
        }
      };

      await ResultHandler.updateResultById(resultId, update);

      cLog.success(`removeComment:: Comment successfully removed, `, commentId);

      return comment;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment, `, commentId, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = ResultManager;
