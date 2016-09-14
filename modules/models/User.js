var mongoose = require('mongoose');

module.exports = mongoose.model('User', { 
  id: String, 
  isBanned: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  karma: { 
    type: Number, 
    default: 0 
  } 
});