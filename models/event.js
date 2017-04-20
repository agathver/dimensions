const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  place: String,
  date: Date,
  image: String,
  link: String
});

module.exports = mongoose.model('Event', schema);
