const mongoose = require('mongoose');

const dateSheetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pageId: {
    type: String,
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: false
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true
    }
  ],
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    require: false
  },
  year: {
    type: String,
    require: false
  },
  examType: {
    type: Number,
    require: false
  }, // 0 = annual, 1 = supply, 2 = test, 3 = retotal
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

module.exports = mongoose.model('DateSheet', dateSheetSchema);
