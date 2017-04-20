const mongoose = require('mongoose');

const schema = mongoose.Schema({
  department: mongoose.Types.ObjectId,
  semester: mongoose.Types.ObjectId,
  subjects: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Course', schema);
