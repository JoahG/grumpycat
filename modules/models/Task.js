var mongoose = require('mongoose');

module.exports = mongoose.model('Task', { 
  task: String,
  created_by: String,
  completed_at: Date
});