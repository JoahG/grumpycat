var connection = require('../slack.js').connection;

module.exports = function(message) {
  var choices = message.text.split('!decide')[1].split(' or ');

  connection.sendMessage(choices[[Math.floor(Math.random() * choices.length)]], message.channel)
};