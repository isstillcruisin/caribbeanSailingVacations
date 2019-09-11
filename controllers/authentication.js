const jwt = require("jwt-simple");
const User = require("../models/user");
const keys = require("../config/keys");
const sendgrid = require("sendgrid");
const Mailer = require("../routes/services/Mailer");
const Token = require ("../models/token");
const crypto = require('crypto');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.sessionSecret);
}

exports.signin = function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }, "email password isAdmin isVerified")
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "Wrong Username or password" });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: "Wrong Username or password" });
        }
        // Make sure the user has been verified
        if (!user.isVerified) {
          return res
            .status(401)
            .send({ 
              type: 'not-verified', 
              message: "Wrong Username or password" 
            }); 
        }
        res.send({ 
          token: tokenForUser(email), 
          adminMode: user.isAdmin 
        });
      });
    })
    .catch(err => console.log(err));
};

exports.signup = function(req, res, next) { 
  // TODO: Check for validation errors
  User.findOne({ email: req.body.email }, function (err, user) {
 
    // Make sure user doesn't already exist
    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
 
    // Create and save the user
    user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
    user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
 
        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            var url = 'http:\/\/' + req.hostname + ':' + req.port + '\/confirm\/' + token.token,
              subject = 'Charter Assistant Email Verification', 
              mailer = new Mailer(
                subject,
                [{email: user.email}], 
                'Hello,\n\n' + 'Please verify your Email Address by clicking the link: \n' + url + '.\n'
              );
            mailer
              .send()
              .then(() => {res.status(200).send({ user: user})})
              .catch(error => console.error(error.toString()));
        });
    });
  });
};

exports.confirm = function (req, res, next) { 
  // Find a matching token
  Token.findOne({ token: req.params.id }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send("This Travel Agent account has been verified. Please log in.");
      });
    });
  });
};
