const mongoose = require('mongoose');

const schema = mongoose.Schema({
  serial: Number,
  subjects: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Semester', schema);
