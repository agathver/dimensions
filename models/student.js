const mongoose = require('mongoose');
const User = require('./user');

const schema = mongoose.Schema({
  batch: {
    type: Number,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    match: /\d+/
  }
});

module.exports = User.discriminator('Student', schema);
