const index = require('../routes/index');
const admin = require('../routes/admin');
const login = require('../routes/login');
const logout = require('../routes/logout');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/admin', admin);
  app.use('/', index);
};
