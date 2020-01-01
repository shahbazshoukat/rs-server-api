const ApplicationException = require("../../exceptions/ApplicationException");
const {
    SectionConstants,
    HTTPStatusCodeConstants
} = require("../../constants");

const {
    cLog,
    validators
} = require("../../helpers");


class SectionUtil {

    static async validateParametersToCreateSection(data) {

        if(!data) {

            throw new ApplicationException(SectionConstants.MESSAGES.NO_DATA_FOUND_TO_ADD_SECTION, HTTPStatusCodeConstants.NOT_FOUND).toJson();
        
        }

        if(!validators.isValidStr(data.title)) {

            throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async validateSectionId(sectionId) {


        if(!validators.isValidId(sectionId)) {

            throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_ID, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

    static async validateSectionTitle(title) {


        if(!validators.isValidStr(title)) {

            throw new ApplicationException(SectionConstants.MESSAGES.INVALID_SECTION_TITLE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

        }

    }

}

module.exports = SectionUtil;