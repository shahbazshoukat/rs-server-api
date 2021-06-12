const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  viewUrl: {
    type: String,
    required: false
  },
  downloadUrl: {
    type: String,
    require: false
  },
  googleDriveFileId: {
    type: String,
    require: false
  },
  name: {
    type: String,
    require: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('File', FileSchema);
