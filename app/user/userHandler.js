const User = require("./user");
const bcrypt = require("bcryptjs");

class UserHandler {
  static async createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = new User({
      name: data.name,
      email: data.email,
      password: hash
    });
    return user.save();
  }
  static loginUser(data) {
    const q = { email: data.email };
    return User.findOne(q)
      .lean()
      .exec();
  }
  static getUsers() {
    return User.find();
  }
  static getUser(userId) {
    return User.findOne({ _id: userId });
  }
  static async resetPassword(userId, nPass) {
    const hash = await bcrypt.hash(nPass, 10);
    const q = { _id: userId };
    const d = { password: hash };
    return User.updateOne(q, d);
  }
}

module.exports = UserHandler;
