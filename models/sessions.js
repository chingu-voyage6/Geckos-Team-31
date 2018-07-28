var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var SessionSchema = new mongoose.Schema({
  session: {
    type: Object,
  },
  expires: {
    type: Date,
  },
});




var Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
