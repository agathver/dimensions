const userlib = require('./user');
const SESSION_PROP = 'user';
const debug = require('debug')('dimensions:auth');

module.exports = {
  populate: function () {
    return function (req, res, next) {
      // do work only when needed
      if (!req.session.hasOwnProperty(SESSION_PROP)) {
        return next();
      }
      userlib.unserialize(req.session[SESSION_PROP])
        .then((user) => {
          if (user) {
            req.user = user;
            debug('populated token storage with a user');
          }
          next();
        }).catch((err) => {
          next(err);
        });
    };
  },
  store: function (req, user) {
    return userlib.serialize(user)
      .then((serializedUser) => {
        req.session[SESSION_PROP] = serializedUser;
        debug('stored user in token storage');
      });
  },
  authenticated: function (req, res, next) {
    if (req.user == null) {
      return res.redirect('/login?redirectTo=' + req.originalUrl);
    } else {
      next();
    }
  }
};
