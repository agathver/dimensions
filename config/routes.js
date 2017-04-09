const index = require('../routes/index');
const admin = require('../routes/admin');
const dashboard = require('../routes/dashboard');
const login = require('../routes/login');

module.exports = function (app) {
  app.use('/', index);
  app.use('/login', login);
  app.use('/dashboard', dashboard);
  app.use('/admin', admin);
};
