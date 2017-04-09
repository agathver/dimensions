const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  place: String,
  date: Date,
  image: String,
  link: String
});

module.exports = mongoose.model('Event', userSchema);
