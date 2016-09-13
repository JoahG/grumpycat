var SlackClient = require('@slack/client');

var slack = new SlackClient.RtmClient(process.env.SLACK_API_TOKEN || '', {
  logLevel: 'error',
  dataStore: new SlackClient.MemoryDataStore()
});

slack.on(SlackClient.CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  console.log(`Connected to ${slack.dataStore.getTeamById(slack.activeTeamId).name} as ${slack.dataStore.getUserById(slack.activeUserId).name}`);
});

slack.start();

module.exports = {
  client: SlackClient,
  connection: slack
};