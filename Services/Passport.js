const Passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

const User = require('../models/User')

// Local Strategy
const opts = { usernameField: 'username' }
const localLogin = new LocalStrategy(opts, (username, password, done) => {
  // Find User
  User.findOne({ username: username }, (err, user) => {
    // Error
    if(err) { return done(err) }

    // No User Found
    if(!user) { return done(null, false) }

    // Found User - Compare Passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) { return done(err) }

      // Passwords do not match
      if(!isMatch) {
        return done(null, false)
      }

      // Passwords Match
      return done(null, user)
    })
  })
})

// JsonWebToken Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SUPER-SECRET-STRING'
}
 
// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if(err) { return done(err, false) }

    if(user) { return done(null, user) }

    return done(null, null)
  })
})

// Tell passport to use theses strategies
Passport.use(jwtLogin)
Passport.use(localLogin) 