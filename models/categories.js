var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categoriesSchema = new Schema({
  _id: String,
  name: String,
  userId: String,
  images: [String]
});
module.exports = mongoose.model('Categories', categoriesSchema);
