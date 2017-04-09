const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  userId: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
