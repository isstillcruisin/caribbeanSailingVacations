const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
// define model here
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  isAdmin: Boolean,
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  firstName: String,
  lastName: String
});


userSchema.pre("save", function(next) {
  const user = this;
  if (this.isNew) {
    //TODO: make sure this also triggers if updating password
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        
        if (err) {
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

// create model class
const User = mongoose.model("user", userSchema);

// export model
module.exports = User;
