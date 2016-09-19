var client = require('./slack.js').client, 
    connection = require('./slack.js').connection,
    Events = require('./events/index.js'),
    mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/grumpycat');

connection.on(client.RTM_EVENTS.MESSAGE, function (message) {
  Object.keys(Events).forEach(function(Event) {
    if (Events[Event].test(message.text)) Events[Event].exec(message);
  });
});