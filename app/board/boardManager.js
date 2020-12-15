const BoardHandler = require('./boardHandler');
const BoardUtil = require('./boardUtil');
const ApplicationException = require('../../exceptions/ApplicationException');
const SectionManager = require('../section/sectionManager');
const CommentManager = require('../comment/CommaneManager');
const UserManager = require('../user/UserManager');
const mailer = require('../utils/mailer');

const {
  BoardConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  cLog,
  restClient,
  config
} = require('../../helpers');

class BoardManager {

  static async createBoard (loggedInUser, data) {

    try {

      await BoardUtil.validateParametersToCreateBoard(data);

      BoardUtil.validateUser(loggedInUser);

      data.isBlocked = false;

      if (config.result.checkBlocked) {

        const resultRes = await restClient.get(data.resultUrl);

        if (resultRes && resultRes.headers && (resultRes.headers['x-frame-options'] || resultRes.headers['X-FRAME-OPTIONS'] ||
            resultRes.headers['X-Frame-Options'] || resultRes.headers['x-Frame-Options'])) {

          data.isBlocked = true;

        }

      }

      const doc = await BoardHandler.createBoard(data);

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

      cLog.info(`getBoardsBySectionId:: getting board by section Id:: ${sectionId}`);

      await BoardUtil.validateSectionId(sectionId);

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

      cLog.success(`getBoardsBySectionTitle:: Boards successfully fetched by section Title:: ${sectionTitle} boards:: `, doc);

      return doc;

    } catch (error) {

      cLog.error(`getBoardsBySectionId:: Failed to fetch Boards sectionId:: ${sectionTitle}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.BOARDS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getBoardsByProvince (province) {

    try {

      cLog.info(`getBoardsByProvince:: Getting boards by province:: ${province}`);

      BoardUtil.validateProvince(province);

      const boards = await BoardHandler.getBoardByProvince(province);

      cLog.success(`getBoardsByProvince:: Boards successfully fetched by province:: ${province}`);

      return boards;

    } catch (error) {

      cLog.error(`getBoardsByProvince:: Failed to fetch Boards by province:: ${province}`, error);

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

  static async updateBoardById (boardId, update) {

    try {

      await BoardUtil.validateBoardId(boardId);

      if (!update) {

        cLog.error(`updateBoardById:: Invalid update data`, update);

        throw new ApplicationException(BoardConstants.MESSAGES.INVALID_BOARD_DATA, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const doc = await BoardHandler.updateBoardById(boardId, update);

      return doc;

    } catch (error) {

      cLog.error(`updateBoardById:: Failed to update Board boardId:: ${boardId} update:: `, update, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_UPDATE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteBoard (loggedInUser, boardId) {

    try {

      await BoardUtil.validateBoardId(boardId);

      BoardUtil.validateUser(loggedInUser);

      const doc = await BoardHandler.deleteBoard(boardId);

      return doc;

    } catch (error) {

      cLog.error(`deleteBoard:: Failed to delete Board boardId:: ${boardId}`, error);

      throw new ApplicationException(error.message || BoardConstants.MESSAGES.FAILED_TO_DELETE_BOARD, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async addComment (boardId, data, link) {

    try {

      cLog.info(`AddComment:: Adding new comment to board:: ${boardId} link:: ${link}`, data);

      await BoardUtil.validateBoardId(boardId);

      const comment = await CommentManager.addComment(data, link);

      const update = {
        $push: {
          comments: comment._id
        }
      };

      await BoardHandler.updateBoardById(boardId, update);

      const users = await UserManager.getUsers();

      for (const user of users) {

        if (user && user.email) {

          try {

            cLog.info(`addComment:: Sending comment email`);

            await mailer.sendCommentEmail(user, link, data);

          } catch (error) {

            cLog.error(`addComment:: Failed to send comment email`);

          }

        }

      }

      cLog.success(`addComment:: Comment successfully added to board:: ${boardId} link:: ${link}, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment to board:: ${boardId} link:: ${link}, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (boardId, commentId) {

    try {

      cLog.info(`removeComment:: Removing new comment from board:: ${boardId}`, commentId);

      await BoardUtil.validateBoardId(boardId);

      const comment = await CommentManager.removeComment(commentId);

      const update = {
        $pull: {
          comments: commentId
        }
      };

      await BoardHandler.updateBoardById(boardId, update);

      cLog.success(`removeComment:: Comment successfully removed from board:: ${boardId}, `, commentId);

      return comment;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment from board:: ${boardId}, `, commentId, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = BoardManager;
