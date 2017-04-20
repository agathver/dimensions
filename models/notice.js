const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  attachments: [{
    name: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    }
  }],
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notice', schema);
