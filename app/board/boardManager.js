const BoardHandler = require('./boardHandler');
const BoardUtil = require('./boardUtil');
const ApplicationException = require('../../exceptions/ApplicationException');
const SectionManager = require('../section/sectionManager');
const {
  BoardConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog,
  restClient,
  config
} = require('../../helpers');

class BoardManager {

  static async createBoard (data) {

    try {

      cLog.info(`createBoard:: Creating new board, data:: `, data);

      await BoardUtil.validateParametersToCreateBoard(data);

      data.isBlocked = false;

      if (config.checkBlocked) {

        cLog.info(`createBoard:: Checking if board is blocked in iframe`);

        const resultRes = await restClient.get(data.resultUrl);

        cLog.info(`createBoard:: Response headers for ${data && data.title}, headers:: `, resultRes.headers);

        if (resultRes && resultRes.headers && (resultRes.headers['x-frame-options'] || resultRes.headers['X-FRAME-OPTIONS'] || resultRes.headers['X-Frame-Options'])) {

          data.isBlocked = true;

        }

      }

      cLog.info(`createBoard:: Is board blocked:: ${data && data.isBlocked}`);

      const doc = await BoardHandler.createBoard(data);

      cLog.info(`createBoard:: Board created successfully`, doc);

      return doc;

    } catch (error) {

      cLog.error(`createBoard:: Failed to create Board data:: `, data, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_ADD_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getBoard (boardId) {

    try {

      cLog.info(`getBoard:: getting board by id:: ${boardId}`);

      await BoardUtil.validateBoardId(boardId);

      const doc = await BoardHandler.getBoard(boardId);

      if (!doc) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getBoard:: Board successfully fetched, boardId:: ${boardId} board:: `, doc);

      return doc;

    } catch (error) {

      cLog.error(`getBoard:: Failed to fetch Board boardId:: ${boardId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARD_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getBoardByKey (boardKey) {

    try {

      await BoardUtil.validateBoardKey(boardKey);

      const doc = await BoardHandler.getBoardByKey(boardKey);

      if (!doc) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await BoardHandler.updateBoardById(doc._id, { $inc: { views: 1 } });

      return doc;

    } catch (error) {

      cLog.error(`getBoardByKey:: Failed to fetch Board by key boardKey:: ${boardKey}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARD_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllBoards () {

    try {

      const doc = await BoardHandler.getAllBoards();

      if (!doc) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getAllBoards:: Failed to fetch Boards`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARDS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getBoardsBySectionId (sectionId) {

    try {

      await BoardUtil.validateSectionId(sectionId);

      cLog.info(`getBoardsBySectionId:: getting board by section Id:: ${sectionId}`);

      const doc = await BoardHandler.getBoardsBySectionId(sectionId);

      if (!doc) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getBoardsBySectionId:: Boards successfully fetched by section id:: ${sectionId} boards:: `);

      return doc;

    } catch (error) {

      cLog.error(`getBoardBySectionId:: Failed to fetch Boards sectionId:: ${sectionId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARDS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getBoardsBySectionTitle (sectionTitle) {

    try {

      await BoardUtil.validateSectionTitle(sectionTitle);

      cLog.info(`getBoardsBySectionTitle:: getting board by section Title:: ${sectionTitle}`);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await BoardUtil.validateSectionId(section._id);

      const doc = await BoardHandler.getBoardsBySectionId(section._id);

      if (!doc) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getBoardsBySectionTitle:: Boards successfully fetched by section Title:: ${sectionTitle} boards:: `);

      return doc;

    } catch (error) {

      cLog.error(`getBoardBySectionId:: Failed to fetch Boards sectionId:: ${sectionTitle}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARDS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateBoard (boardId, data) {

    try {

      await BoardUtil.validateBoardId(boardId);

      await BoardUtil.validateParametersToCreateBoard(data);

      const doc = await BoardHandler.updateBoard(boardId, data);

      return doc;

    } catch (error) {

      cLog.error(`updateBoard:: Failed to update Board boardId:: ${boardId} update:: `, data, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_UPDATE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteBoard (boardId) {

    try {

      await BoardUtil.validateBoardId(boardId);

      const doc = await BoardHandler.deleteBoard(boardId);

      return doc;

    } catch (error) {

      cLog.error(`deleteBoard:: Failed to delete Board boardId:: ${boardId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_DELETE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = BoardManager;
