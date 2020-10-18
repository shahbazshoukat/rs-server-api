const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  refUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Comment', CommentSchema);
