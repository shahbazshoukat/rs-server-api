const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  name:{ type: String, required: true},
  email:{ type: String, require: true},
  password:{ type: String, require: true},
  role: { type: Number, require: false} 
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
