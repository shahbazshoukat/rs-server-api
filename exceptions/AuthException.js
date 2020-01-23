const GenericException = require('./GenericExceptions');

class AuthException extends GenericException {

  constructor (message, code = 401, meta = {}) {

    super(message, code, meta);

  }

}

module.exports = AuthException;
