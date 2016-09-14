var connection = require('../slack.js').connection;
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/grumpycat');

var KarmaUser = mongoose.model('KarmaUser', { 
  id: String, 
  karma: { 
    type: Number, 
    default: 0 
  } 
});

module.exports = function(message) {
  var actingUser = message.user,
      targetedUser = /\<\@(\w+)\>/gi.exec(message.text)[1],
      action = undefined;

  console.log(connection.dataStore.getUserById(actingUser).name);

  if (process.env.BANNED_USERS && JSON.parse(process.env.BANNED_USERS).indexOf(connection.dataStore.getUserById(actingUser).name) > -1) { 
    connection.sendMessage('You are banned.', message.channel);
    return false;
  }

  if (/\<\@\w+\>(\+\+)/gi.test(message.text)) {
    if (targetedUser == actingUser) {
      connection.sendMessage('You can\'t upvote yourself, dumbass', message.channel);
      return;
    }

    action = 'upvote';
  } else if (/\<\@\w+\>(\-\-)/gi.test(message.text)) {
    action = 'downvote';
  }

  if (!action) return;

  KarmaUser.findOne({
    id: targetedUser
  }, function(err, user) {
    if (user == null) {
      var user = new KarmaUser({
        id: targetedUser
      });
    }

    if (action == 'upvote') user.karma++;
    if (action == 'downvote') user.karma--;

    user.save(function() {
      connection.sendMessage('<@' + targetedUser + '> now has ' + user.karma + ' karma points.', message.channel);
    });
  });
};