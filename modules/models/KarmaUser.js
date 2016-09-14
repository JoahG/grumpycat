var mongoose = require('mongoose');

module.exports = mongoose.model('KarmaUser', { 
  id: String, 
  karma: { 
    type: Number, 
    default: 0 
  } 
});