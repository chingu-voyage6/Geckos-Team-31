const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportService = require('../Services/Passport')
const chalk = require('chalk')
const jwt = require('jwt-simple') // Json web token, for protected routes

// Passport  - Middleware Functions
const requireSignIn = passport.authenticate('local', { session: false }) // Checks user login details
const requireAuth = passport.authenticate('jwt', { session: false }); // Ensures the JWT passed is valid

// Creates a UserToken. We will check this token for all authorized routes.
const userToken = user => {
  const timeStamp = new Date().getTime()
  return jwt.encode({ sub: user._id, iat: timeStamp }, "SUPER-SECRET-STRING")
}

// Register User
router.post('/register', (req, res) => {
  // Create New User - Omitting password until we hash it.
  let newUser = new User({
    email: req.body.email,
    username: req.body.username
  })

  // Using Bcrypt to hash the password. Could move this back to a mongoose.pre if you prefer.
  bcrypt.genSalt(10, (err, salt) => {
    if(err) { console.log(chalk.red(`Error: ${err}`)) }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if(err) { console.log(chalk.red(`Error: ${err}`)) }

      newUser.password = hash;

      // Call the method we added to User.js(model).
      User.register(newUser, (error, user) => {
        if(error) {
          res.json({
            success: false,
            error
          })
        }
        res.json({
          success: true,
          user
        })
      })
    })
  })
})

router.post('/login', requireSignIn, (req, res) => {
  // If the user is successfully logged in then the user objetc will be available on the req object, as req.user
  // If the users - username/password are incorrect an unauthorised response will be sent.
  res.json({
    success: true,
    token: userToken(req.user)
  })
})


router.get('/logout', requireAuth, (req, res) => {
  res.json({
    success: true,
  })
})

// Example of a protected route using the JWT we create when a user logs in.
router.get('/auth', requireAuth, (req, res) => {
  // As with login, if the user passes the correct token then the current user will be available on the req object.
  // If not then we will get unauthorized again.
  res.json({
    success: true,
    user: req.user
  })
})

module.exports = router
