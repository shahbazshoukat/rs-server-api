const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  description: {
    type: String,
    require: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('News', newsSchema);
