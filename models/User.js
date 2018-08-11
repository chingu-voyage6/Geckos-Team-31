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
    default: [
    {fileName: "bath.jpg", category: "Getting ready", userSubmitted: false },
    {fileName: "soap.jpg", category: "Getting ready", userSubmitted: false },
    {fileName: "put-on-deodorant.jpg", category: "Getting ready", userSubmitted: false },
    {fileName: "getting-dressed.jpg", category: "Getting ready", userSubmitted: false },
    {fileName: "toast.jpg", category: "Getting ready", userSubmitted: false }]
  },
  categories: {
    type: Array,
    default: ['Getting ready'],
  },
  onboarding: {
    type: Object,
  },
  'onboarding.firstLogin': {
    type: Boolean,
    default: false,
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Callback here is the 2nd arguement passwed to User.register inside User.js (Routes).
module.exports.register = (newUser, callback) => {
  newUser.save(callback)
}
