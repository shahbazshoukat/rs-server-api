const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  status: {
    type: Boolean,
    required: false
  }, // 0 = not announced, 1 = announced 
  section: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Section", 
    required: false
  },
  board: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Board", 
    require: false
  },
  year:{ 
    type: String, 
    require: false
  },
  announceDate: {
    type: Object, 
    require: false
  },
  examType: {
    type: Number, 
    require: false
  }, // 0 = annual, 1 = supply, 2 = test, 3 = retotal
  resultUrl:{
    type: String, 
    required: false
  },
  tags: [
    { 
      type: String, 
      require: false
    }
  ]
},{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model('Result', resultSchema);
