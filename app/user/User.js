const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    required: true
  },
  lastToken: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model('User', userSchema);
