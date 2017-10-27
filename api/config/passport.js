const passport = require('passport')
const User = require('../models/user')
const Employee = require('../models/employee')
const config = require('./config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
}

// Setting up local login Strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err)
    }

    if (!user) {
      Employee.findOne({
        email: email
      }, (err, employee) => {
        if (err) return done(err)

        if (!employee) {
          return done(null, false, {
            error: 'Your login details could not be verified. Please try again.'
          })
        }
        employee.comparePassword(password, (err, isMatch) => {
          if (err) return done(err)

          if (!isMatch) {
            return done(null, false, {
              error: 'Your login details could not be verified. Please try again.'
            })
          }
          return done(null, employee)
        })
      })
    } else {
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err)
        }

        if (!isMatch) {
          return done(null, false, {
            error: 'Your login details could not be verified. Please try again.'
          })
        }

        return done(null, user)
      })
    }
  })
})

//  Setting JWT strategy options
const jwtOptions = {
  //  Telling Passport to check authorization headers for jwt
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //  Telling passport where to find the secret
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(err, false)
    }

    if (user) {
      done(null, user)
    } else {
      Employee.findById(payload._id, (err, employee) => {
        if (err) {
          return done(err, false)
        }

        if (employee) {
          done(null, employee)
        } else {
          done(null, false)
        }
      })
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)