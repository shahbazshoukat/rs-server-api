const FB = require('fb');
const ApplicationException = require('../../exceptions/ApplicationException');

const {
  cLog,
  config
} = require('../../helpers');

const {
  MiscConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

class SocialMediaUtil {

  static async createPostOnFbPage (pageId, message) {

    try {

      cLog.info(`createPostOnFbPage:: Create post of fb page:: ${pageId}, message:: ${message}`);

      await FB.setAccessToken(config.fb.accessToken);

      const response = await FB.api(`/${pageId}/feed`, 'POST', { message });

      if (!response) {

        cLog.error(`createPostOnFbPage:: No response for create post on fb page:: ${pageId}, message:: ${message}, error:: `, response.error);

        throw new ApplicationException(MiscConstants.MESSAGES.EMPTY_RESPONSE_FROM_FB, HTTPStatusCodeConstants.FORBIDDEN).toJson();

      }

      cLog.success(`createPostOnFbPage:: Post successfully created on fb page:: ${pageId}, message:: ${message}`);

    } catch (error) {

      cLog.error(`createPostOnFbPage:: Failed to create post on fb page:: ${pageId}, message:: ${message}, error:: `, error.message);

      throw new ApplicationException(MiscConstants.MESSAGES.FAILED_TO_CREATE_POST_ON_FB, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

    }

  }

}

module.exports = SocialMediaUtil;
