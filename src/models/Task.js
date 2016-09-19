'use strict';

import mongoose from 'mongoose';

export default mongoose.model('Task', { 
  task: String,
  created_by: String,
  completed_at: Date
});