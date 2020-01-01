const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsersUtils {
  static bcryptPassword(pass) {
    bcrypt.hash(pass, 10).then(hash => {
      return hash;
    });
  }
}

module.exports = UsersUtils;
