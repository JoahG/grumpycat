'use strict';

import { connection } from '../slack.js';
import { User } from '../models';

export default function(userId, callback) {
  if (process.env.BANNED_USERS && process.env.BANNED_USERS.split(',').indexOf(connection.dataStore.getUserById(userId).name) > -1) {
    callback(true);
    return;
  }

  return User.find({
    id: userId,
    isBanned: true
  }, function(err, user) {
    if (user.length > 0) {
      callback(true);
    } else {
      callback(false);
    }
  });
};