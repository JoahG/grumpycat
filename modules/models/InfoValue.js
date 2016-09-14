var mongoose = require('mongoose');

module.exports = mongoose.model('InfoValue', { 
  key: {
    type: String,
    unique: true
  },
  value: String,
  created_by: String
});