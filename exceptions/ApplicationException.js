const GenericException = require("./GenericExceptions");

class ApplicationException extends GenericException {

    constructor(message, code = 500, meta = {}) {

        super(message, code, meta);

    }

}

module.exports = ApplicationException;