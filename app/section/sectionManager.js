const SectionHandler = require('./sectionHandler');
const SectionUtil = require('./sectionUtil');
const ApplicationException = require('../../exceptions/ApplicationException');
const {
  SectionConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog,
  validators
} = require('../../helpers');

class SectionManager {

  static async createSection (data) {

    try {

      await SectionUtil.validateParametersToCreateSection(data);

      const doc = await SectionHandler.createSection(data);

      return doc;

    } catch (error) {

      cLog.error(`createSection:: Failed to create Section data:: `, data, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.FAILED_TO_ADD_SECTION, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getSection (sectionId) {

    try {

      await SectionUtil.validateSectionId(sectionId);

      const doc = await SectionHandler.getSection(sectionId);

      if (!doc) {

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getSection:: Failed to fetch Section SectionId:: ${sectionId}`, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.SECTION_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getSectionByTitle (title) {

    try {

      await SectionUtil.validateSectionTitle(title);

      const doc = await SectionHandler.getSectionByTitle(title);

      if (!doc) {

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getSection:: Failed to fetch Section SectionTitle:: ${title}`, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.SECTION_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async getAllSections () {

    try {

      const doc = await SectionHandler.getAllSections();

      if (!doc) {

        throw new ApplicationException(SectionConstants.MESSAGES.SECTION_NOT_FOUND, HTTPStatusCodeConstants.NOT_FOUND).toJson();

      }

      return doc;

    } catch (error) {

      cLog.error(`getAllSections:: Failed to fetch Sections`, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.SECTIONS_FETCHING_FAILED, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async updateSection (sectionId, data) {

    try {

      await SectionUtil.validateSectionId(sectionId);

      await SectionUtil.validateParametersToCreateSection(data);

      const doc = await SectionHandler.updateSection(sectionId, data);

      return doc;

    } catch (error) {

      cLog.error(`updateSection:: Failed to update Section SectionId:: ${sectionId} update:: `, data, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.FAILED_TO_UPDATE_SECTION, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

  static async deleteSection (sectionId) {

    try {

      await SectionUtil.validateSectionId(sectionId);

      const doc = await SectionHandler.deleteSection(sectionId);

      return doc;

    } catch (err) {

      cLog.error(`deleteSection:: Failed to delete Section SectionId:: ${sectionId}`, error);

      throw new ApplicationException(error.message || SectionConstants.MESSAGES.FAILED_TO_DELETE_SECTION, error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).toJson();

    }

  }

}

module.exports = SectionManager;
