const ResultHandler = require('./resultHandler');
const SectionManager = require('../section/sectionManager');
const BoardManager = require('../board/boardManager');
const ResultUtil = require('./resultUtil');
const CommentManager = require('../comment/CommaneManager');
const mailer = require('../utils/mailer');
const UserManager = require('../user/UserManager');

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
  config
} = require('../../helpers');

class ResultManager {

  static async createResult (data) {

    try {

      cLog.info(`createNewResult:: Creating new result`, data);

      await ResultUtil.validateParametersToCreateResult(data);

      cLog.info(`createNewResult:: Checking if result already exists`);

      const res = await ResultHandler.getResult(data.sectionId, data.boardId, data.year, data.examType);

      if (res) {

        cLog.error(`createResult:: Result already added`, data);

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_ALREADY_ADDED, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      data.isBlocked = false;

      if (config.result.checkBlocked) {

        cLog.info(`createNewResult:: Checking if result url is blocked by x-frame-options`);

        data.isBlocked = await ResultUtil.checkBlockedWebsite(data.resultUrl);

        cLog.success(`createNewResult:: Result url is ${data.isBlocked ? 'blocked' : 'open'}`);

      }

      const doc = await ResultHandler.createResult(data);

      cLog.success(`createNewResult:: Result successfully created`, doc);

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

  static async getResultYears (secId, boardId) {

    try {

      cLog.info(`getResultYears:: getting result years section title:: ${secId} boardKey:: ${boardId}`);

      await ResultUtil.validateParametersToGetResultYears(secId, boardId);

      cLog.info(`getResultYears:: getting result years section id:: ${secId} board id:: ${boardId}`);

      const doc = await ResultHandler.getResultYears(secId, boardId);

      cLog.success(`getResultYears:: Successfully get result years section id:: ${secId} board id:: ${boardId} years:: `);

      return doc;

    } catch (error) {

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_FETCH_YEARS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getExamTypes (secId, boardId, year) {

    try {

      cLog.info(`getExamTypes:: getting exam types section id:: ${secId} board id:: ${boardId} year:: ${year}`);

      await ResultUtil.validateParametersToGetExamTypes(secId, boardId, year);

      cLog.info(`getExamTypes:: getting exam section id:: ${secId} board id:: ${boardId} year:: ${year}`);

      const doc = await ResultHandler.getExamTypes(secId, boardId, year);

      cLog.success(`getExamTypes:: Successfully get exam types section id:: ${secId} board id:: ${boardId} year:: ${year}`, doc);

      return doc;

    } catch (error) {

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.FAILED_TO_FETCH_EXAM_TYPES, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

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

      if (examType === ResultConstants.EXAM_TYPES.ANNUAL) {

        examType = ResultEnums.EXAM_TYPES.ANNUAL;

      } else if (examType === ResultConstants.EXAM_TYPES.SUPPLY) {

        examType = ResultEnums.EXAM_TYPES.SUPPLY;

      } else if (examType === ResultConstants.EXAM_TYPES.TEST) {

        examType = ResultEnums.EXAM_TYPES.TEST;

      }

      cLog.info(`getResult:: getting result section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`);

      const result = await ResultHandler.getResult(section._id, board._id, year, examType);

      if (!result || !result.resultUrl) {

        throw new ApplicationException(ResultConstants.MESSAGES.RESULT_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await ResultHandler.updateResultById(result._id, { $inc: { views: 1 } });

      await BoardManager.updateBoardById(board._id, { $inc: { views: 1 } });

      cLog.success(`getResult:: Successfully get result section id:: ${section._id} board id:: ${board._id} year:: ${year} examType:: ${examType}`);

      return result;

    } catch (error) {

      cLog.error(`getResult:: Failed to fetch result section:: ${sectionTitle} board:: ${boardKey} year:: ${year} examtype:: ${examType}`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getResultsBySectionAndBoard (sectionTitle, boardKey) {

    try {

      cLog.info(`getResultsBySectionAndBoard:: Getting results by section::${sectionTitle} and board:: ${boardKey}`);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        cLog.error(`getResultsBySectionAndBoard:: Section:: ${sectionTitle} not found`);

        throw new ApplicationException(ResultConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        cLog.error(`getResultsBySectionAndBoard:: Board:: ${boardKey} not found`);

        throw new ApplicationException(ResultConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const results = await ResultHandler.getResultsBySectionAndBoard(section._id, board._id);

      cLog.success(`getResultsBySectionAndBoard:: Results successfully fetched by section::${sectionTitle} and board:: ${boardKey}`);

      return results;

    } catch (error) {

      cLog.error(`getResultsBySectionAndBoard:: Failed to get results by section and board`, error);

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

  static async addComment (resultId, data, link) {

    try {

      cLog.info(`AddComment:: Adding new comment to result:: ${resultId} link:: ${link}`, data);

      await ResultUtil.validateResultId(resultId);

      const comment = await CommentManager.addComment(data, link);

      const update = {
        $push: {
          comments: comment._id
        }
      };

      await ResultHandler.updateResultById(resultId, update);

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

      cLog.success(`addComment:: Comment successfully added to result:: ${resultId} link:: ${link}, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment to result:: ${resultId} link:: ${link}, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (resultId, commentId) {

    try {

      cLog.info(`removeComment:: Removing new comment from result:: ${resultId}`, commentId);

      await ResultUtil.validateResultId(resultId);

      const comment = await CommentManager.removeComment(commentId);

      const update = {
        $pull: {
          comments: commentId
        }
      };

      await ResultHandler.updateResultById(resultId, update);

      cLog.success(`removeComment:: Comment successfully removed from result:: ${resultId}, `, commentId);

      return comment;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment from result:: ${resultId}, `, commentId, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async getLatestResults () {

    try {

      cLog.info(`getLatestResults:: Getting latest results`);

      const data = await ResultHandler.getLatestResults();

      cLog.success(`getLatestResults:: Latest results successfully found`, data);

      return data;

    } catch (error) {

      cLog.error(`getLatestResults:: Failed to get latest results`, error);

      throw new ApplicationException(error.message || ResultConstants.MESSAGES.RESULTS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async updateAllResults (clas) {

    try {

      cLog.info(`updateAllResults:: Updating all results`, clas);

      const cls = await SectionManager.getSectionByTitle(clas);

      if (!cls || !cls._id) {

        cLog.error(`updateAllResults:: No class found`);

      }

      const q = { section: cls._id, examType: 1 };

      const data = await ResultHandler.updateAllResults(q);

      cLog.success(`updateAllResults:: Results successfully updated`, clas, data);

      return data;

    } catch (error) {

      cLog.error(`updateAllResults:: Failed to update all results`, error);

      throw new ApplicationException(error.message || 'Failed to update results', error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = ResultManager;
