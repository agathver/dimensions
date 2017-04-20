const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  place: String,
  date: Date,
  image: String,
  link: String,
  attachments: [{name: String, file: String}],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', userSchema);
