const User = require('./User');
const bcrypt = require('bcrypt-nodejs');

class UserHandler {

  static async createNewUser (data) {

    const salt = bcrypt.genSaltSync(10);

    const hash = await bcrypt.hashSync(data.password, salt);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hash,
      role: data.role,
      lastToke: null
    });

    return user.save();

  }

  static getUserByEmail (email) {

    const q = { email };

    return User.findOne(q).lean().exec();

  }

  static getUsers () {

    return User.find().select('name email role');

  }

  static getUserById (UserId) {

    return User.findOne({ _id: UserId }).select('name email role');

  }

  static findUser (q) {

    return User.findOne(q).lean().exec();

  }

  static updateUserById (UserId, update = {}) {

    const q = { _id: UserId };

    return User.updateOne(q, update);

  }

  static updateUserByEmail (email, update = {}) {

    const q = { email };

    return User.updateOne(q, update);

  }

  static removeUserById (UserId) {

    const q = { _id: UserId };

    return User.deleteOne(q);

  }

}

module.exports = UserHandler;
