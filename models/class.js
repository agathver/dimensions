const mongoose = require('mongoose');

const schema = mongoose.Schema({
  department: {
    type: mongoose.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  batch: {
    type: Number,
    required: true
  },
  semester: {
    type: mongoose.Types.ObjectId,
    ref: 'Semester',
    required: true
  },
  section: {
    type: String
  },
  students: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
      }
    ],
    required: true
  }
});

module.exports = mongoose.model('Class', schema);
