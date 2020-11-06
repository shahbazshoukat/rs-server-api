const NewsManager = require('./newsManager');
const {
  NewsConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class NewsCtrl {

  static async createNews (req, res) {

    try {

      const doc = await NewsManager.createNews(req.body);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: NewsConstants.MESSAGES.NEWS_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createNews:: Failed to create News`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getNewsById (req, res) {

    try {

      const doc = await NewsManager.getNewsById(req.params.newsId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: NewsConstants.MESSAGES.NEWS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`getNews:: Failed to get Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getAllNews (req, res) {

    try {

      const doc = await NewsManager.getAllNews();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: NewsConstants.MESSAGES.NEWS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`getAllNews:: Failed to get News`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateNews (req, res) {

    try {

      const doc = await NewsManager.updateNews(req.params.newsId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: NewsConstants.MESSAGES.NEWS_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`updateNews:: Failed to update News`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteNews (req, res) {

    try {

      const doc = await NewsManager.deleteNews(req.params.newsId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: NewsConstants.MESSAGES.NEWS_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`deleteNews:: Failed to delete News`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = NewsCtrl;
