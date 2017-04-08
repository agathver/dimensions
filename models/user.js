const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  userId: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    match: /(\+91)?\d+/
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  type: {
    type: String,
    enum: ['student', 'faculty', 'staff', 'admin']
  },
  groups: [{
    type: String,
    enum: ['library_admin', 'academic_admin', 'noticeboard', 'wheel']
  }]
});

userSchema.virtual('name').get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('User', userSchema);
