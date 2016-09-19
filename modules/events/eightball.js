var connection = require('../slack.js').connection;

var answers = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes definitely.',
  'You may rely on it.',
  'As I see it yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy. Try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  'Don\'t count on it.',
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.'
];

EightballHandler = function(message) {
  connection.sendMessage(answers[[Math.floor(Math.random() * answers.length)]], message.channel)
};

module.exports = {
  exec: EightballHandler,
  test: function(messageText) {
    return /\<\@(.*)\>.*\?/gi.test(messageText) && /\<\@(.*)\>.*\?/gi.exec(messageText)[1] == connection.activeUserId;
  }
};