const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  place: String,
  date: Date,
  image: String,
  link: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', schema);
