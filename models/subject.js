const mongoose = require('mongoose');
const utils = require('../lib/utils');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
});

schema.pre('save', function (next) {
  this.slug = utils.slugify(this.name);
  next();
});

module.exports = mongoose.model('Subject', schema);
