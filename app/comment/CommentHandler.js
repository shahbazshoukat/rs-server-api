const Comment = require('./comment');

class CommentHandler {

  static addComment (data) {

    const comment = new Comment({
      name: data.name,
      email: data.email,
      text: data.text,
      refUrl: data.refUrl
    });

    return comment.save();

  }

  static removeComment (id) {

    return Comment.deleteOne({ _id: id });

  }

  static getCommentById (id) {

    return Comment.findOne({ _id: id });

  }

}

module.exports = CommentHandler;
