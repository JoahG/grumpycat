var { connection } = require('../slack.js');
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
      mode = undefined;

  if (/\<\@\w+\>(\+\+)/gi.test(message.text)) {
    if (targetedUser == actingUser) {
      connection.sendMessage('You can\'t upvote yourself, dumbass', message.channel);
      return;
    }

    mode = 'upvote';
  } else if (/\<\@\w+\>(\-\-)/gi.test(message.text)) {
    mode = 'downvote';
  }

  if (!mode) return;

  KarmaUser.findOne({
    id: targetedUser
  }, function(err, user) {
    if (user == null) {
      var user = new KarmaUser({
        id: targetedUser
      });
    }

    if (mode == 'upvote') user.karma++;
    if (mode == 'downvote') user.karma--;

    user.save(function() {
      connection.sendMessage('<@' + targetedUser + '> now has ' + user.karma + ' karma points.', message.channel);
    });
  });
};