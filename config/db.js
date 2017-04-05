const mongoose = require('mongoose');
var debug = require('debug')('dimensions:dbconnect');

mongoose.Promise = Promise;

module.exports = function (app) {
    mongoose.connect( process.env.MONGO_URI || 'mongodb://127.0.0.1/dimensions' ).then( () => {
        debug('Succesfully connected to mongodb database');
    }).catch( (err) => {
        debug(err);
        console.error('Cannot connect to db'+err);
        //process.exit(1);
    });
}
