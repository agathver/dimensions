const mongoose = require('mongoose');
const User = require('./user');

const schema = mongoose.Schema({
  assignedClasses: [{
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    time: {
      type: [String],
      required: true,
      match: /(S|M|T|W|TH|F|SU) \d\d\:\d\d/
    }
  }]
}, { discriminatorKey: 'type', timestamps: true });

module.exports = User.discriminator('Faculty', schema);
