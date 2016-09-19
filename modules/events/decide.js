var connection = require('../slack.js').connection;

var DecideHandler = function(message) {
  var choices = message.text.split('!decide')[1].split(' or ');

  connection.sendMessage(choices[[Math.floor(Math.random() * choices.length)]], message.channel)
};

module.exports = {
  exec: DecideHandler,
  test: function(messageText) {
    return /^\!decide/.test(messageText);
  }
};