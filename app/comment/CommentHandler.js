const Comment = require('./comment');

class CommentHandler {

  static addComment (data) {

    const comment = new Comment({
      name: data.name,
      text: data.text
    });

    return comment.save();

  }

  static removeComment (id) {

    return Comment.deleteOne({ _id: id });

  }

  getCommentById (id) {

    return Comment.findOne({ _id: id });

  }

}

module.exports = CommentHandler;
