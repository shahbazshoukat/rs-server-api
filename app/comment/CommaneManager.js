const CommentHandler = require('./CommentHandler');

const ApplicationException = require('../../exceptions/ApplicationException');

const {
  cLog,
  validators
} = require('../../helpers');

const {
  CommentConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

class CommentManager {

  static async addComment (data) {

    try {

      cLog.info(`AddComment:: Adding new comment`, data, CommentConstants);

      if (!data || !validators.isValidStr(data.name) || !validators.isValidStr(data.text)) {

        cLog.error(`addComment:: Invalid comment data:: `, data);

        throw new ApplicationException(CommentConstants.MESSAGES.INVALID_COMMENT, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const comment = await CommentHandler.addComment(data);

      cLog.success(`addComment:: Comment successfully added, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (id) {

    try {

      cLog.info(`removeComment:: Removing comment with id:: ${id}`);

      if (!validators.isValidId(id)) {

        cLog.error(`removeComment:: Invalid comment id:: `, id);

        throw new ApplicationException(CommentConstants.MESSAGES.INVALID_COMMENT_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      await CommentHandler.removeComment(id);

      return true;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment, `, id, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = CommentManager;
