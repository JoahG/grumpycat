var client = require('./slack.js').client, 
    connection = require('./slack.js').connection,
    Events = require('./events/index.js');

connection.on(client.RTM_EVENTS.MESSAGE, function (message) {
  if (/\<\@\w+\>(\+\+|\-\-|\–)/gi.test(message.text)) {
    Events.KarmaHandler(message);
  }

  if (/^\!decide/.test(message.text)) {
    Events.DecideHandler(message);
  }
});