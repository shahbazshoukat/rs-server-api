const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  status: {
    type: Boolean,
    required: false
  }, // 0 = not announced, 1 = announced
  showAnnouncedDate: {
    type: Boolean,
    required: false
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: false
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: false
  },
  year: {
    type: String,
    require: false
  },
  announceDate: {
    type: Date,
    require: false
  },
  examType: {
    type: Number,
    require: false
  }, // 0 = annual, 1 = supply, 2 = test, 3 = retotal
  resultUrl: {
    type: String,
    required: false
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
  isBlocked: {
    type: Boolean,
    required: false,
    default: false
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Result', resultSchema);
