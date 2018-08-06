var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  categories: {
    type: Array,
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Callback here is the 2nd arguement passwed to User.register inside User.js (Routes).
module.exports.register = (newUser, callback) => {
  newUser.save(callback)
}
