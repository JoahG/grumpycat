'use strict';

import mongoose from 'mongoose';

export default mongoose.model('InfoValue', { 
  key: {
    type: String,
    unique: true
  },
  value: String,
  created_by: String
});