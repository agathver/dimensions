const mongoose = require('mongoose');
var debug = require('debug')('dimensions:dbconnect');

mongoose.Promise = Promise;

module.exports = function () {
  return mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1/dimensions').then(() => {
    debug('Established connection to database');
  }).catch((err) => {
    debug(err);
    console.error('Cannot connect to db' + err); // eslint-disable-line no-console
    //process.exit(1);
  });
};
