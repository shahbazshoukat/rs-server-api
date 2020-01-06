const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({

  key:{
    type: String,
    required: false
  },

  title:{ 
    type: String, 
    required: false
  },

  province:{
    type: String, 
    require: false
  },

  city:{ 
    type: String, 
    require: false
  },

  examTypes: [
    {
      type: Object, 
      require: false
    } // 0 = annual, 1 = supply, 2 = test, 3 = retotal
  ],

  sections:[
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Section", 
      required: false
    }
  ],

  type: {
    type: String,
    required: false
  },

  webUrl:{
    type: String, 
    required: false
  },

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

module.exports = mongoose.model('Board', boardSchema);
