const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// pre save hook - have to use function() so we can use this
// Hook triggers upon creating or updating a user
userSchema.pre('save', function(next) {
  const user = this;
  // isModified checks if the document was modified
  // Created or updated ---> true
  if (!user.isModified('password')) {
    return next();
  }
  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      user.password = hashedPassword;
      next();
    });
  });
});

// Used function() so this evals to the user we are operating on
// If we use an arrow func, then this refers to the obj in userSchema
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
}

mongoose.model('User', userSchema);