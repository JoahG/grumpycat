var connection = require('../slack.js').connection,
    KarmaUser = require('../models/index.js').KarmaUser,
    permissions = require('../permissions/index.js');

module.exports = function(message) {
  var actingUser = message.user,
      targetedUser = /\<\@(\w+)\>/gi.exec(message.text)[1],
      action = undefined;

  permissions.isBanned(actingUser, function(isBanned) {
    if (isBanned) {
      connection.sendMessage('You are banned.', message.channel);
      return false;
    }

    if (/\<\@\w+\>(\+\+)/gi.test(message.text)) {
      if (targetedUser == actingUser) {
        connection.sendMessage('You can\'t upvote yourself, dumbass', message.channel);
        return;
      }

      action = 'upvote';
    } else if (/\<\@\w+\>(\-\-|\—)/gi.test(message.text)) {
      action = 'downvote';
    }

    if (!action) return;

    console.log(connection.dataStore.getUserById(actingUser).name + ' just ' + action + 'd ' + connection.dataStore.getUserById(targetedUser).name);

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
        connection.sendMessage('<@' + targetedUser + '> now has ' + user.karma + ' karma.', message.channel);
      });
    });
  });
};