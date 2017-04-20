const mongoose = require('mongoose');

const schema = mongoose.Schema({
  date: Date,
  subject: mongoose.Types.ObjectId,
  semester: mongoose.Types.ObjectId,
  present: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('AttendanceRecord', schema);
