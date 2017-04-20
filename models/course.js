const mongoose = require('mongoose');

const schema = mongoose.Schema({
  department: {
    type: mongoose.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  semester: {
    type: mongoose.Types.ObjectId,
    ref: 'Semester',
    required: true
  },
  subjects: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
      }
    ],
    required: true
  }
});

module.exports = mongoose.model('Course', schema);
