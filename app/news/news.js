const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  link: {
    type: String,
    required: false
  },
  description: {
    type: String,
    require: false
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: false
  },
  province: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('News', newsSchema);
