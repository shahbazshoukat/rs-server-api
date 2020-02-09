const CommentManager = require('./CommaneManager');

const {
  CommentConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

class CommentCtrl {

  static async addComment (req, res) {

    try {

      const data = await CommentManager.addComment(req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_ADDED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async removeComment (req, res) {

    try {

      const data = await CommentManager.removeComment(req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_REMOVED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = CommentCtrl;
