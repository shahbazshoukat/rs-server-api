const ModelPaperHandler = require('./modelPaperHandler');
const SectionManager = require('../section/sectionManager');
const BoardManager = require('../board/boardManager');
const ModelPaperUtil = require('./modelPaperUtil');
const CommentManager = require('../comment/CommaneManager');
const mailer = require('../utils/mailer');
const UserManager = require('../user/UserManager');
const FbHelper = require('../utils/socialMediaUtil');
const GoogleDriveHandler = require('../utils/googleDriveAPI');

const ApplicationException = require('../../exceptions/ApplicationException');
const {
  ModelPaperConstants,
  HTTPStatusCodeConstants,
  CommentConstants,
  BoardConstants,
  SectionConstants
} = require('../../constants');

const {
  cLog,
  config
} = require('../../helpers');

class ModelPaperManager {

  static async createModelPaper (data, file) {

    try {

      data = JSON.parse(data);

      cLog.info(`createModelPaper:: Creating new model paper`, data, `file:: `, file);

      await ModelPaperUtil.validateParametersToCreateModelPaper(data);

      const board = await BoardManager.getBoard(data.boardId);

      const section = await SectionManager.getSection(data.sectionId);

      ModelPaperUtil.getModelPaperNameAndPageId(board, section, data);

      cLog.info(`createModelPaper:: Checking if model paper already exists`);

      const res = await ModelPaperHandler.getModelPaperByBoardAndPageId(board._id, data.pageId);

      if (res) {

        cLog.error(`createModelPaper:: Model paper already added`, data);

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_ALREADY_ADDED, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      file.filename = data.pageId;

      const fileResponse = await GoogleDriveHandler.uploadFile(file, board.modelPapersDir);

      cLog.info(`createModelPaper:: response from Google Drive file upload API:: `, fileResponse.data);

      if (!fileResponse || !fileResponse.data) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.FAILED_TO_ADD_MODEL_PAPER, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const publicUrlResponse = await GoogleDriveHandler.generatePublicUrl(fileResponse.data.id);

      cLog.info(`createModelPaper:: response from Google Drive public url API:: `, publicUrlResponse.data);

      if (!publicUrlResponse || !publicUrlResponse.data) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.FAILED_TO_ADD_DATE_SHEET, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      data.viewUrl = publicUrlResponse.data.webViewLink;

      data.downloadUrl = publicUrlResponse.data.webContentLink;

      data.fileId = fileResponse.data.id;

      const modelPaper = await ModelPaperHandler.createModelPaper(data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      cLog.success(`createModelPaper:: Model paper successfully created, data:: `, data, `file:: `, file);

      return modelPaper;

    } catch (error) {

      cLog.error(`createModelPaper:: Failed to create model paper data:: `, data, `file:: `, file, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.FAILED_TO_ADD_MODEL_PAPER, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPaperById (modelPaperId) {

    try {

      await ModelPaperUtil.validateModelPaperId(modelPaperId);

      const modelPaper = await ModelPaperHandler.getModelPaperById(modelPaperId);

      if (!modelPaper) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return modelPaper;

    } catch (error) {

      cLog.error(`getModelPaperById:: Failed to fetch model paper modelPaperId:: ${modelPaperId}`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllModelPapers () {

    try {

      const modelPapers = await ModelPaperHandler.getAllModelPapers();

      if (!modelPapers) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return modelPapers;

    } catch (error) {

      cLog.error(`getAllModelPapers:: Failed to fetch model papers`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.DATE_SHEET_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPapersByBoardKey (boardKey) {

    try {

      cLog.info(`getModelPapersByBoardKey:: getting model papers by boardKey:: ${boardKey}`);

      await ModelPaperUtil.validateBoardKey(boardKey);

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getModelPapersByBoardKey:: getting model papers by board id:: ${board._id}`);

      const modelPapers = await ModelPaperHandler.getModelPapersByBoardId(board._id);

      if (!modelPapers) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getModelPapersByBoardKey:: Successfully get model papers by board id:: ${board._id}`);

      return {
        modelPapers,
        board
      };

    } catch (error) {

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPapersByBoardDomain (domain) {

    try {

      cLog.info(`getModelPapersByBoardDomain:: getting model papers by board domain:: ${domain}`);

      await ModelPaperUtil.validateBoardDomain(domain);

      const board = await BoardManager.getBoardByDomain(domain);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getModelPapersByBoardDomain:: getting model papers by board id:: ${board._id}`);

      const modelPapers = await ModelPaperHandler.getModelPapersByBoardId(board._id);

      if (!modelPapers) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.success(`getModelPapersByBoardDomain:: Successfully get model papers by board id:: ${board._id}`);

      return {
        modelPapers,
        board
      };

    } catch (error) {

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPaper (sectionTitle, boardDomain, subject) {

    try {

      cLog.info(`getModelPaper:: Getting model paper section:: ${sectionTitle} board:: ${boardDomain} subject:: ${subject}`);

      await ModelPaperUtil.validateParametersToGetModelPaper(sectionTitle, boardDomain, subject);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      const board = await BoardManager.getBoardByDomain(boardDomain);

      if (!board || !board._id) {

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      cLog.info(`getModelPaper:: getting model paper section id:: ${section._id} board id:: ${board._id} subject:: ${subject}`);

      const modelPaper = await ModelPaperHandler.getModelPaper(section._id, board._id, subject);

      cLog.success(`getModelPaper:: Successfully get model paper section id:: ${section._id} board id:: ${board._id} subject:: ${subject}`);

      if (!modelPaper) {

        cLog.error(`getModelPaper:: Model paper not found section:: ${sectionTitle} board:: ${boardDomain} subject:: ${subject}`);

        throw new ApplicationException(ModelPaperConstants.MESSAGES.DATE_SHEET_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await ModelPaperHandler.updateModelPaperById(modelPaper._id, { $inc: { views: 1 } });

      await BoardManager.updateBoardById(board._id, { $inc: { views: 1 } });

      return modelPaper;

    } catch (error) {

      cLog.error(`getModelPaper:: Failed to fetch model paper, section:: ${sectionTitle} board:: ${boardDomain} subject:: ${subject}`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPaperByBoardAndPageId (boardDomain, pageId) {

    try {

      cLog.info(`getModelPaperByBoardAndPageId:: Getting model paper by pageId:: ${pageId}, board :: ${boardDomain}`);

      const board = await BoardManager.getBoardByDomain(boardDomain);

      const modelPaper = await ModelPaperHandler.getModelPaperByBoardAndPageId(board && board._id, pageId);

      if (!modelPaper) {

        cLog.error(`getModelPaperByBoardAndPageId:: Model paper not found pageId:: ${pageId}, board :: ${boardDomain}`);

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await ModelPaperHandler.updateModelPaperById(modelPaper._id, { $inc: { views: 1 } });

      await BoardManager.updateBoardById(board._id, { $inc: { views: 1 } });

      cLog.success(`getModelPaperByBoardAndPageId:: Model paper successfully fetched with pageId:: ${pageId}, board :: ${boardDomain}`);

      return modelPaper;

    } catch (error) {

      cLog.error(`getModelPaperByBoardAndPageId:: Failed to fetch model paper, pageId:: ${pageId}, board :: ${boardDomain}`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getModelPapersBySectionAndBoard (sectionTitle, boardKey) {

    try {

      cLog.info(`getModelPapersBySectionAndBoard:: Getting model papers by section::${sectionTitle} and board:: ${boardKey}`);

      const section = await SectionManager.getSectionByTitle(sectionTitle);

      if (!section || !section._id) {

        cLog.error(`getModelPapersBySectionAndBoard:: Section:: ${sectionTitle} not found`);

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const board = await BoardManager.getBoardByKey(boardKey);

      if (!board || !board._id) {

        cLog.error(`getModelPapersBySectionAndBoard:: Board:: ${boardKey} not found`);

        throw new ApplicationException(BoardConstants.MESSAGES.BOARD_NOT_FOUND, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

      }

      const modelPapers = await ModelPaperHandler.getModelPapersBySectionAndBoard(section._id, board._id);

      cLog.success(`getModelPapersBySectionAndBoard:: Model papers successfully fetched by section::${sectionTitle} and board:: ${boardKey}`);

      return modelPapers;

    } catch (error) {

      cLog.error(`getModelPapersBySectionAndBoard:: Failed to get model papers by section and board`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateModelPaperById (modelPaperId, data) {

    try {

      await ModelPaperUtil.validateModelPaperId(modelPaperId);

      await ModelPaperUtil.validateParametersToCreateModelPaper(data);

      const doc = await ModelPaperHandler.updateModelPaper(modelPaperId, data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      return doc;

    } catch (error) {

      cLog.error(`updateModelPaperById:: Failed to update model paper modelPaperId:: ${modelPaperId} update:: `, data, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.FAILED_TO_UPDATE_DATE_SHEET, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteModelPaperById (modelPaperId) {

    try {

      await ModelPaperUtil.validateModelPaperId(modelPaperId);

      const modelPaper = await ModelPaperHandler.getModelPaperById(modelPaperId);

      cLog.info(`deleteModelPaperById:: Deleting model paper: ${modelPaperId}`, modelPaper);

      if (!modelPaper) {

        throw new ApplicationException(ModelPaperConstants.MESSAGES.MODEL_PAPER_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      await GoogleDriveHandler.deleteFile(modelPaper.fileId);

      const doc = await ModelPaperHandler.deleteModelPaper(modelPaperId);

      return doc;

    } catch (error) {

      cLog.error(`deleteModelPaperById:: Failed to delete model paper modelPaperId:: ${modelPaperId}`, error);

      throw new ApplicationException(error.message || ModelPaperConstants.MESSAGES.FAILED_TO_DELETE_MODEL_PAPER, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async addComment (modelPaperId, data, link) {

    try {

      cLog.info(`addComment:: Adding new comment to model paper:: ${modelPaperId} link:: ${link}`, data);

      await ModelPaperUtil.validateModelPaperId(modelPaperId);

      const comment = await CommentManager.addComment(data, link);

      const update = {
        $push: {
          comments: comment._id
        }
      };

      await ModelPaperHandler.updateModelPaperById(modelPaperId, update);

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

      cLog.success(`addComment:: Comment successfully added to modelPaperId:: ${modelPaperId} link:: ${link}, `, comment);

      return comment;

    } catch (error) {

      cLog.error(`addComment:: Failed to add comment to modelPaperId:: ${modelPaperId} link:: ${link}, `, data, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_ADD_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async removeComment (modelPaperId, commentId) {

    try {

      cLog.info(`removeComment:: Removing new comment from modelPaperId:: ${modelPaperId}`, commentId);

      await ModelPaperUtil.validateModelPaperId(modelPaperId);

      const comment = await CommentManager.removeComment(commentId);

      const update = {
        $pull: {
          comments: commentId
        }
      };

      await ModelPaperHandler.updateModelPaperById(modelPaperId, update);

      cLog.success(`removeComment:: Comment successfully removed from modelPaperId:: ${modelPaperId}, `, commentId);

      return comment;

    } catch (error) {

      cLog.error(`removeComment:: Failed to remove comment from modelPaperId:: ${modelPaperId}, `, commentId, error);

      throw new ApplicationException(error.message || CommentConstants.MESSAGES.FAILED_TO_REMOVE_COMMENT, error.code || HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = ModelPaperManager;
