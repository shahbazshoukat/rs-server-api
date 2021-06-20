const mongoose = require('mongoose');
const {
  ModelPaperEnums
} = require('../../enums');

const modelPaperSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pageId: {
    type: String,
    required: true
  },
  subject: {
    type: ModelPaperEnums.SUBJECT,
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: false
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    require: false
  },
  description: {
    type: String,
    required: false
  },
  tags: [
    {
      type: String,
      require: false
    }
  ],
  views: {
    type: Number,
    required: false,
    default: 0
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false
    }
  ],
  viewUrl: {
    type: String,
    required: false
  },
  downloadUrl: {
    type: String,
    require: false
  },
  fileId: {
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

module.exports = mongoose.model('ModelPaper', modelPaperSchema);
