const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
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
