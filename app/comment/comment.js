const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Comment', CommentSchema);
