const mongoose = require('mongoose');

const schema = mongoose.Schema({
  serial: Number
});

module.exports = mongoose.model('Semester', schema);
