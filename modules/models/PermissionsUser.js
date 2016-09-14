var mongoose = require('mongoose');

module.exports = mongoose.model('PermissionsUser', { 
  id: String, 
  isBanned: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});