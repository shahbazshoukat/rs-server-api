const NewsHandler = require('./newsHandler');
const NewsUtil = require('./newsUtil');
const FbHelper = require('../utils/socialMediaUtil');
const ApplicationException = require('../../exceptions/ApplicationException');
const { NewsConstants, HTTPStatusCodeConstants } = require('../../constants');

const { cLog, config } = require('../../helpers');

class NewsManager {

  static async createNews (data) {

    try {

      await NewsUtil.validateParametersToCreateNews(data);

      const response = await NewsHandler.createNews(data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      return response;

    } catch (error) {

      cLog.error(`createNews:: Failed to create news data:: `, data, error);

      throw new ApplicationException(error.message || NewsConstants.MESSAGES.FAILED_TO_ADD_NEWS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getNewsById (newsId) {

    try {

      await NewsUtil.validateNewsId(newsId);

      const doc = await NewsHandler.getNewsById(newsId);

      if (!doc) {

        throw new ApplicationException(NewsConstants.MESSAGES.NEWS_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getNews:: Failed to fetch news newsId:: ${newsId}`, error);

      throw new ApplicationException(error.message || NewsConstants.MESSAGES.NEWS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllNews () {

    try {

      const doc = await NewsHandler.getAllNews();

      if (!doc) {

        throw new ApplicationException(NewsConstants.MESSAGES.NEWS_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getAllNews:: Failed to fetch newss`, error);

      throw new ApplicationException(error.message || NewsConstants.MESSAGES.NEWS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateNews (newsId, data) {

    try {

      await NewsUtil.validateNewsId(newsId);

      await NewsUtil.validateParametersToCreateNews(data);

      const doc = await NewsHandler.updateNews(newsId, data);

      if (data.postToFb && data.postText) {

        await FbHelper.createPostOnFbPage(config.fb.pageId, data.postText);

      }

      return doc;

    } catch (error) {

      cLog.error(`updateNews:: Failed to update news newsId:: ${newsId} update:: `, data, error);

      throw new ApplicationException(error.message || NewsConstants.MESSAGES.FAILED_TO_UPDATE_NEWS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteNews (newsId) {

    try {

      await NewsUtil.validateNewsId(newsId);

      const doc = await NewsHandler.deleteNews(newsId);

      return doc;

    } catch (error) {

      cLog.error(`deleteNews:: Failed to delete news newsId:: ${newsId}`, error);

      throw new ApplicationException(error.message || NewsConstants.MESSAGES.FAILED_TO_DELETE_NEWS, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = NewsManager;
