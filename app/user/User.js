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
  lastToken: {
    type: Number,
    require: false
  }
});

module.exports = mongoose.model('User', userSchema);
