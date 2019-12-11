'use strict';

import { connection } from '../slack.js';
import { User } from '../models';;

var LeaderboardHandler = function(message) {
  User.find({ }, function(err, users) {
    connection.sendMessage(users.sort(function(a, b) {
      if (a.karma < b.karma) return 1;
      if (b.karma < a.karma) return -1;
      return 0;
    }).map(function(user) {
      return `<@${ user.id }>: ${ user.karma } karma`;
    }).join(`\n`), message.channel);
  });
};

export default {
  exec: LeaderboardHandler,
  test: function(messageText) {
    return /^\!leaderboard$/.test(messageText);
  }
};