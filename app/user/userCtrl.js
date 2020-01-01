const UserManager = require("./userManager");

class UserController {
  static async createUser(req, res) {
    try {
      const doc = await UserManager.createUser(req.body);
      res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: doc._id
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err
      });
    }
  }
  static async loginUser(req, res) {
    try {
      const doc = await UserManager.loginUser(req.body);
      res.status(201).json({
        success: true,
        message: "User Logged In Successfully",
        data: doc
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err
      });
    }
  }
  static async findUserByEmail(req, res) {
    try {
      const doc = await UserManager.findUserByEmail(req.body);
      res.json(doc);
    } catch (err) {
      return res.status(401).json({
        message: "User No Found!"
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const doc = await UserManager.getUsers();
      console.log(doc);
      res.status(200).json({
        message: "Users fetched successfully!",
        users: doc
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getUser(req, res) {
    try {
      const doc = await UserManager.getUser(req.params.id);
      res.status(200).json({
        name: doc.name,
        email: doc.email
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async resetPassword(req, res) {
    try {
      const doc = await UserManager.resetPassword(
        req.body.token,
        req.body.password
      );
      res.status(200).json({
        message: "Password reset successfully!"
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
