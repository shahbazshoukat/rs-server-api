const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  type: {
    type: String,
    require: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Section', sectionSchema);
