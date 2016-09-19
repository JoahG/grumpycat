var connection = require('../slack.js').connection,
    permissions = require('../permissions/index.js'),
    User = require('../models/index.js').User;

var AdminHandler = function(message) {
  permissions.isAdmin(message.user, function(isAdmin) {
    if (!isAdmin) {
      connection.sendMessage('You\'re not an admin.', message.channel);
      return;
    }

    if (/^!admin\sban\s\<\@(.+)\>/.test(message.text)) {
      User.findOne({
        id: /^!admin\sban\s\<\@(.+)\>/.exec(message.text)[1]
      }, function(err, user) {
        if (user == null) {
          user = new User({
            id: /^!admin\sban\s\<\@(.+)\>/.exec(message.text)[1]
          });
        } 

        user.isBanned = true;
        user.save(function() {
          connection.sendMessage('<@' + user.id + '> is now banned.', message.channel);
        });
      });
    } else if (/^!admin\sunban\s\<\@(.+)\>/.test(message.text)) {
      User.findOne({
        id: /^!admin\sunban\s\<\@(.+)\>/.exec(message.text)[1]
      }, function(err, user) {
        if (user == null) {
          user = new User({
            id: /^!admin\sunban\s\<\@(.+)\>/.exec(message.text)[1]
          });
        } 

        user.isBanned = false;
        user.save(function() {
          connection.sendMessage('<@' + user.id + '> is no longer banned.', message.channel);
        });
      });
    } else if (/^!admin\spromote\s\<\@(.+)\>/.test(message.text)) {
      User.findOne({
        id: /^!admin\spromote\s\<\@(.+)\>/.exec(message.text)[1]
      }, function(err, user) {
        if (user == null) {
          user = new User({
            id: /^!admin\spromote\s\<\@(.+)\>/.exec(message.text)[1]
          });
        } 

        user.isAdmin = true;
        user.save(function() {
          connection.sendMessage('<@' + user.id + '> is now an admin.', message.channel);
        });
      });
    } else if (/^!admin\sdemote\s\<\@(.+)\>/.test(message.text)) {
      User.findOne({
        id: /^!admin\sdemote\s\<\@(.+)\>/.exec(message.text)[1]
      }, function(err, user) {
        if (user == null) {
          user = new User({
            id: /^!admin\sdemote\s\<\@(.+)\>/.exec(message.text)[1]
          });
        } 

        user.isAdmin = false;
        user.save(function() {
          connection.sendMessage('<@' + user.id + '> is no longer an admin.', message.channel);
        });
      });
    } else if (/^!admin\ssetKarma\s\<\@(.+)\>\s(-?\d+)/.test(message.text)) {
      User.findOne({
        id: /^!admin\ssetKarma\s\<\@(.+)\>\s(-?\d+)/.exec(message.text)[1]
      }, function(err, user) {
        if (user == null) {
          user = new User({
            id: /^!admin\ssetKarma\s\<\@(.+)\>\s(-?\d+)/.exec(message.text)[1]
          });
        } 

        user.karma = parseInt(/^!admin\ssetKarma\s\<\@(.+)\>\s(-?\d+)/.exec(message.text)[2]);
        user.save(function() {
          connection.sendMessage('<@' + user.id + '> now has ' + user.karma.toString() + ' karma.', message.channel);
        });
      });
    }
  });
};


module.exports = {
  exec: AdminHandler,
  test: function(messageText) {
    return /^!admin\s(ban|unban|promote|demote|setKarma)\s\<\@.+\>/.test(messageText);
  }
};