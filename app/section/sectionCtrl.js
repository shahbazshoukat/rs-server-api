const SectionManager = require('./sectionManager');
const {
  SectionConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const {
  cLog
} = require('../../helpers');

class SectionController {

  static async createSection (req, res) {

    try {

      const doc = await SectionManager.createSection(req.user, req.body);

      res.status(HTTPStatusCodeConstants.CREATED).json({ success: true, message: SectionConstants.MESSAGES.SECTION_ADDED_SUCCESSFULLY, data: doc._id });

    } catch (error) {

      cLog.error(`createSection:: Failed to create Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getSection (req, res) {

    try {

      const doc = await SectionManager.getSection(req.params.sectionId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: SectionConstants.MESSAGES.SECTION_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`getSection:: Failed to get Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getSectionByTitle (req, res) {

    try {

      const doc = await SectionManager.getSectionByTitle(req.params.title);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: SectionConstants.MESSAGES.SECTION_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`getSection:: Failed to get Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async getAllSections (req, res) {

    try {

      const doc = await SectionManager.getAllSections();

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: SectionConstants.MESSAGES.SECTIONS_FETCHED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`getAllSections:: Failed to get Sections`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async updateSection (req, res) {

    try {

      const doc = await SectionManager.updateSection(req.params.sectionId, req.body);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: SectionConstants.MESSAGES.SECTION_UPDATED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`updateSection:: Failed to update Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

  static async deleteSection (req, res) {

    try {

      const doc = await SectionManager.deleteSection(req.user, req.params.sectionId);

      res.status(HTTPStatusCodeConstants.OK).json({ success: true, message: SectionConstants.MESSAGES.SECTION_DELETED_SUCCESSFULLY, data: doc });

    } catch (error) {

      cLog.error(`deleteSection:: Failed to delete Section`, error);

      res.status(error.code || HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || HTTPStatusCodeConstants.MESSAGES.INTERNAL_SERVER_ERROR, data: null });

    }

  }

}

module.exports = SectionController;
