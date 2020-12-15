const BoardManager = require('./boardManager');
const {
  BoardConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class BoardController {

  static async createBoard (req, res) {

    try {

      const doc = await BoardManager.createBoard(req.user, req.body);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: BoardConstants.MESSAGES.BOARD_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createBoard:: Failed to create board`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getBoard (req, res) {

    try {

      const doc = await BoardManager.getBoard(req.params.boardId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARD_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getBoardByKey (req, res) {

    try {

      const doc = await BoardManager.getBoardByKey(req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARD_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getAllBoards (req, res) {

    try {

      const doc = await BoardManager.getAllBoards();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARDS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getBoardsBySectionId (req, res) {

    try {

      const doc = await BoardManager.getBoardsBySectionId(req.params.sectionId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARDS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getBoardsBySectionTitle (req, res) {

    try {

      const doc = await BoardManager.getBoardsBySectionTitle(req.params.sectionTitle);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARDS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async getBoardByProvince (req, res) {

    try {

      const doc = await BoardManager.getBoardsByProvince(req.params.province);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARDS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, data: null });

    }

  }

  static async updateBoard (req, res) {

    try {

      const doc = await BoardManager.updateBoard(req.params.boardId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARD_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteBoard (req, res) {

    try {

      const doc = await BoardManager.deleteBoard(req.user, req.params.boardId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: BoardConstants.MESSAGES.BOARD_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async addComment (req, res) {

    try {

      const link = req.headers.referer;

      const data = await BoardManager.addComment(req.params.boardId, req.body, link);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_ADDED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async removeComment (req, res) {

    try {

      const data = await BoardManager.removeComment(req.params.boardId, req.params.commentId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_REMOVED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = BoardController;
