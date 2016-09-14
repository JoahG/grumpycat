var connection = require('../slack.js').connection,
    InfoValue = require('../models/index.js').InfoValue,
    permissions = require('../permissions/index.js');

module.exports = function(message) {
  if (/^!info\s(.+)/.test(message.text)) {
    InfoValue.findOne({
      key: /^!info\s(.+)/.exec(message.text)[1]
    }, function(err, info) {
      if (info) {
        connection.sendMessage(info.value, message.channel);
      } else {
        connection.sendMessage('Info does not exist for key.', message.channel)
      }
    });
  } else if (/^!learn\s(.+)\sas\s(.+)/.test(message.text)) {
    InfoValue.find({
      key: /^!learn\s(.+)\sas\s(.+)/.exec(message.text)[1]
    }, function(err, info) {
      if (info.length > 0 && info[0].created_by !== message.user) {
        connection.sendMessage('<@' + info[0].created_by + '> is already remembering "' + info[0].value + '"', message.channel);
      } else {
        var newInfo = new InfoValue({
          key: /^!learn\s(.+)\sas\s(.+)/.exec(message.text)[1],
          value: /^!learn\s(.+)\sas\s(.+)/.exec(message.text)[2],
          created_by: message.user
        });

        newInfo.save(function() {
          connection.sendMessage('Got it!', message.channel);
        });
      }
    });
  } else if (/^!forget\s(.+)/.test(message.text)) {
    InfoValue.find({
      key: /^!forget\s(.+)/.exec(message.text)[1]
    }, function(err, info) {
      if (info.length > 0) {
        permissions.isAdmin(message.user, function(isAdmin) {
          if (info[0].created_by !== message.user && !isAdmin) {
            connection.sendMessage('Cannot forget <@' + info[0].created_by +'>\'s note.', message.channel);
            return;
          }
          InfoValue.remove({ key: info[0].key }, function() {
            connection.sendMessage('What were we talking about?', message.channel);
          });
        });
      } else {
        connection.sendMessage('Info does not exist for key.', message.channel)
      }
    });
  }
};