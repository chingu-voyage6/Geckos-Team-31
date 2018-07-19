var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  _id: String,
  name: String,
  email: String
});
module.exports = mongoose.model('Users', usersSchema);
