const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  login: function (username, password) {
    return User.findOne({
      userId: username
    }).lean().exec().then((user) => {
      if (user == null) {
        return Promise.resolve(false);
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password).then((result) => {
        resolve(result ? user : false);
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
  },

  changePassword: function(user, password) {
    return User.findOne({
      userId: user.userId
    }).exec().then((user) => {
      return bcrypt.hash(password, 13)
        .then((result) =>{
          user.password = result;
          return user.save();
        });
    });
  }
};
