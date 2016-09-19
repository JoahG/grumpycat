'use strict';

import { client, connection } from './slack.js';
import Events from './events';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/grumpycat');

connection.on(client.RTM_EVENTS.MESSAGE, function (message) {
  Object.keys(Events).forEach(function(Event) {
    if (Events[Event].test(message.text)) Events[Event].exec(message);
  });
});

export default { };