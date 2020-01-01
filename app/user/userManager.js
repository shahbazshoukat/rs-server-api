const UserHandler = require("./userHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/mailer");
class UserManager {
  static async createUser(data) {
    try {
      const doc = await UserHandler.createUser(data);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async loginUser(data) {
    try {
      let fetchedUser;
      const doc = await UserHandler.loginUser(data);
      if (!doc) {
        return {
          message: "Auth failed"
        };
      }
      fetchedUser = doc;
      const isValidPass = await bcrypt.compare(
        data.password,
        fetchedUser.password
      );
      if (!isValidPass) {
        return {
          message: "Auth failed"
        };
      }
      const token = await jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "pakistan_zindabad",
        { expiresIn: "1h" }
      );
      return {
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        name: fetchedUser.name,
        email: fetchedUser.email
      };
    } catch (err) {
      console.log(err);
    }
  }
  static async findUserByEmail(data) {
    try {
      let fetchedUser;
      const doc = await UserHandler.loginUser(data);
      if (!doc) {
        return {
          message: "User No Found!"
        };
      }
      fetchedUser = doc;
      const token = await jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "pakistan_zindabad",
        { expiresIn: "1h" }
      );
      await mailer.sendEmail(data.email, token);
      return {
        token: token,
        expiresIn: 3600,
        message: "Confirmation link sent to Email!"
      };
    } catch (err) {
      console.log(err);
    }
  }
  static async getUsers() {
    try {
      const doc = await UserHandler.getUsers();
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async getUser(userId) {
    try {
      const doc = await UserHandler.getUser(userId);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
  static async resetPassword(token, nPass) {
    const decodedToken = await jwt.verify(token, "pakistan_zindabad");
    try {
      const doc = await UserHandler.resetPassword(decodedToken.userId, nPass);
      return doc;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserManager;
