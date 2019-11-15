const jwt = require('jwt-simple')
const User = require('../models/user')
const keys = require('../config/keys')
const Mailer = require('../routes/services/Mailer')
const Token = require('../models/token')
const crypto = require('crypto')

function tokenForUser (user) {
  const timestamp = new Date().getTime()
  const obj = { sub: user.id, iat: timestamp, userid: user.id }
  return jwt.encode(obj, keys.sessionSecret)
}

exports.signin = function (req, res, next) {
  const { email, password } = req.body
  User.findOne({ email }, 'email password isAdmin isVerified')
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Wrong Username or password' })
      }
      user.comparePassword(password, (error, isMatch) => {
        if (error) {
          return res.status(500).send(error)
        }
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: 'Wrong Username or password' })
        }
        // Make sure the user has been verified
        if (!user.isVerified) {
          return res
            .status(401)
            .send({
              type: 'not-verified',
              message: 'Wrong Username or password'
            })
        }
        const token = tokenForUser(user)
        res.send({
          token: token,
          adminMode: user.isAdmin
        })
      })
    })
    .catch(err => console.log(err))
}

exports.signup = function (req, res, next) {
  // TODO: Check for validation errors
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return res.status(500).send({ msg: err.message }) }
    // Make sure user doesn't already exist
    if (user) { return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' }) }

    // Create and save the user
    user = new User({ email: req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName })
    user.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }) }

      // Create a verification token for this user
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex'), type: 'confirm' })

      // Save the verification token
      token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }) }

        // Send the email
        var url = 'http://' + req.hostname + ':' + keys.clientPort + '/confirm/' + token.token
        var subject = 'Charter Assistant Email Verification'
        var mailer = new Mailer(
          subject,
          [{ email: user.email }],
          'Hello,\n\n' + 'Please verify your Email Address by clicking the link: \n' + url + '.\n'
        )
        mailer
          .send()
          .then(() => { res.status(200).send({ user: user }) })
          .catch(error => console.error(error.toString()))
      })
    })
  })
}

exports.confirm = function (req, res, next) {
  // Find a matching token
  Token.findOne({ token: req.params.id, type: 'confirm' }, function (err, token) {
    if (err) { return res.status(500).send({ msg: err.message }) }
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' })

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
      if (err) { return res.status(500).send({ msg: err.message }) }

      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' })
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' })

      // Verify and save the user
      user.isVerified = true
      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }) }
        res.status(200).send({message: 'This Travel Agent account has been verified. Please log in.'})
      })
    })
  })
}

exports.currentUser = function (req, res, next) {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(404).json({ msg: 'there is no logged in user' })
  }
}

exports.resetPasswordEmail = function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return res.status(500).send({ msg: err.message }) }

    // Make sure user exists:
    if (!user) return res.status(200).send('email not in db')

    // Create a password reset token for this user
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex'), type: 'passwordreset' })

    // Save the verification token
    token.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }) }

      // Send the email
      var url = 'http://' + req.hostname + ':' + keys.clientPort + '/reset-password/' + token.token
      var subject = 'Password Reset'
      var mailer = new Mailer(
        subject,
        [{ email: user.email }],
        'You are receiving this email because you (or someone else) have requested the reset of the password for your account.' +
          '<br><br>To reset your password, click the following link: \n' + url + '.\n' +
          '<br><br>If you did not request this, please ignore this email.' +
          '<br><br>Thanks, <br>Charter Assistant'
      )
      mailer
        .send()
        .then(() => { res.status(200).send('recovery email sent') })
        .catch(error => console.error(error.toString()))
    })
  })
}

exports.resetPassword = function (req, res, next) {
  Token.findOne({ token: req.body.token, type: 'passwordreset' })
    .then((dbToken) => {
      User.update({ _id: dbToken._userId }, {
        $set: { password: req.body.password }
      })
        .then(() => {
          dbToken.remove()
            .then(() => {
              res.status(200).send('password updated')
            })
            .catch(err => res.status(422).json(err))
        })
        .catch(err => res.status(422).json(err))
    })
    .catch(err => res.status(401).json(err))
}

exports.update = function (req, res, next) {
  User.update({ _id: req.user._id }, {
    $set: req.body
  })
    .then((dbUser) => {
      res.status(200).send(dbUser)
    })
    .catch(err => res.status(500).json(err))
}
