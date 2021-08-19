const ModelPaperManager = require('./modelPaperManager');
const {
  ModelPaperConstants,
  HTTPStatusCodeConstants,
  CommentConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

const uploadFile = require('../../middleware/Upload');

class ModelPaperCtrl {

  static async createModelPaper (req, res) {

    try {

      await uploadFile(req, res);

      const doc = await ModelPaperManager.createModelPaper(req.body && req.body.data, req.file);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: ModelPaperConstants.MESSAGES.MODEL_PAPER_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createModelPaper:: Failed to create model paper`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPaperById (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPaperById(req.params.modelPaperId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ModelPaperConstants.MESSAGES.MODEL_PAPER_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getAllModelPapers (req, res) {

    try {

      const doc = await ModelPaperManager.getAllModelPapers();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ModelPaperConstants.MESSAGES.MODEL_PAPERS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPaper (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPaper(req.params.section, req.params.domain, req.params.subject);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateModelPaperById (req, res) {

    try {

      const doc = await ModelPaperManager.updateModelPaperById(req.params.modelPaperId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ModelPaperConstants.MESSAGES.MODEL_PAPER_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteModelPaperById (req, res) {

    try {

      const doc = await ModelPaperManager.deleteModelPaperById(req.params.modelPaperId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: ModelPaperConstants.MESSAGES.MODEL_PAPER_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPapersByBoardKey (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPapersByBoardKey(req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPapersByBoardDomain (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPapersByBoardDomain(req.params.domain);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async addComment (req, res) {

    try {

      const link = req.headers.referer;

      const data = await ModelPaperManager.addComment(req.params.modelPaperId, req.body, link);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_ADDED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async removeComment (req, res) {

    try {

      const data = await ModelPaperManager.removeComment(req.params.modelPaperId, req.params.commentId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: CommentConstants.MESSAGES.COMMENT_SUCCESSFULLY_REMOVED, data });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPapersBySectionAndBoard (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPapersBySectionAndBoard(req.params.sectionTitle, req.params.boardKey);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getModelPaperByBoardAndPageId (req, res) {

    try {

      const doc = await ModelPaperManager.getModelPaperByBoardAndPageId(req.domain, req.params.title);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getLatestModelPapers (req, res) {

    try {

      const doc = await ModelPaperManager.getLatestModelPapers();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, data: doc });

    } catch (error) {

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = ModelPaperCtrl;
