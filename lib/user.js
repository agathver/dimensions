const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  login: function (username, password) {
    return User.findOne({
      userId: username
    }).lean().exec().then((user) => {
      if (user == null) {
        return Promise.reject('Invalid username or password');
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            return resolve(user);
          } else {
            reject('Invalid username or password');
          }
        });
      });
    });
  },

  serialize: function (user) {
    return Promise.resolve({
      userId: user.userId,
      revision: user.revision
    });
  },

  unserialize: function (data) {
    return User.findOne({
      userId: data.userId,
      // revision: data.revision
    }).lean().exec();
  }
};
