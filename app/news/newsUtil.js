const ApplicationException = require('../../exceptions/ApplicationException');
const { NewsConstants, HTTPStatusCodeConstants } = require('../../constants');

const { validators } = require('../../helpers');

class NewsUtil {

  static async validateParametersToCreateNews (data) {

    if (!data) {

      throw new ApplicationException(NewsConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_NEWS, HTTPStatusCodeConstants.NOT_FOUND).toJson();

    }

    if (data.link && !validators.isValidStr(data.link)) {

      throw new ApplicationException(NewsConstants.MESSAGES.INVALID_NEWS_LINK, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

    if (!validators.isValidStr(data.description)) {

      throw new ApplicationException(NewsConstants.MESSAGES.INVALID_NEWS_DESCRIPTION, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

  static async validateNewsId (newsId) {

    if (!validators.isValidId(newsId)) {

      throw new ApplicationException(NewsConstants.MESSAGES.INVALID_NEWS_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = NewsUtil;
