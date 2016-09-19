'use strict';

import client from '@slack/client';

const connection = new client.RtmClient(process.env.SLACK_API_TOKEN || '', {
  logLevel: 'error',
  dataStore: new client.MemoryDataStore()
});

connection.on(client.CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  console.log(`Connected to ${connection.dataStore.getTeamById(connection.activeTeamId).name} as ${connection.dataStore.getUserById(connection.activeUserId).name}`);
});

connection.start();

export { client, connection };