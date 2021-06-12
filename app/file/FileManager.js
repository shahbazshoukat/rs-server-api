const FileHandler = require('./FileHandler');
const ApplicationException = require('../../exceptions/ApplicationException');
const { NewsConstants, HTTPStatusCodeConstants } = require('../../constants');

const { cLog, config } = require('../../helpers');

class NewsManager {

  static async createFile (data) {

    try {

      return await FileHandler.createFile(data);

    } catch (error) {

      cLog.error(`createFile:: Failed to create file data:: `, data, error);

      throw new ApplicationException(error.message, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getFileById (newsId) {

    try {

      return await FileHandler.getFileById(newsId);

    } catch (error) {

      cLog.error(`getFileById:: Failed to fetch file fileId:: ${newsId}`, error);

      throw new ApplicationException(error.message, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateFileById (fileId, data) {

    try {

      const doc = await FileHandler.updateFile(fileId, data);

      return doc;

    } catch (error) {

      cLog.error(`updateFileById:: Failed to update file fileId:: ${fileId} update:: `, data, error);

      throw new ApplicationException(error.message, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteFileById (fileId) {

    try {

      const doc = await FileHandler.deleteFile(fileId);

      return doc;

    } catch (error) {

      cLog.error(`deleteFileById:: Failed to delete file fileId:: ${fileId}`, error);

      throw new ApplicationException(error.message, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = NewsManager;
