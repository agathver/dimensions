const mongoose = require('mongoose');
var debug = require('debug')('dimensions:dbconnect');

module.exports = function (app) {
    mongoose.connect( process.env.MONGO_URI || 'mongodb://localhost/dimensions' ).then( () => {
        debug('Succesfully connected to mongodb database');
    }).catch( (err) => {
        debug(err);
        console.error('Cannot connect to db'+err);
        //process.exit(1);
    });
}