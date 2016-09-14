var client = require('./slack.js').client, 
    connection = require('./slack.js').connection,
    Events = require('./events/index.js'),
    mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/grumpycat');

connection.on(client.RTM_EVENTS.MESSAGE, function (message) {
  if (/\<\@\w+\>(\+\+|\-\-|\—)/gi.test(message.text)) {
    Events.KarmaHandler(message);
  }

  if (/^\!decide/.test(message.text)) {
    Events.DecideHandler(message);
  }

  if (/^!(info|learn|forget)\s(.+)/.test(message.text)) {
    Events.InfoHandler(message);
  }

  if (/^!admin\s(ban|unban|promote|demote|setKarma)\s\<\@.+\>/.test(message.text)) {
    Events.AdminHandler(message);
  }
});