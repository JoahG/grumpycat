var SlackClient = require('@slack/client');



var slack = new SlackClient.RtmClient(process.env.SLACK_API_TOKEN || '', {
  logLevel: 'debug',
  dataStore: new SlackClient.MemoryDataStore();
});


var CLIENT_EVENTS = SlackClient.CLIENT_EVENTS;
 
slack.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

slack.on(CLIENT_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team 
  console.log(message);
});

slack.on(CLIENT_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team 
});

slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  // Get the user's name 
  var user = slack.dataStore.getUserById(slack.activeUserId);
 
  // Get the team's name 
  var team = slack.dataStore.getTeamById(slack.activeTeamId);
 
  // Log the slack team name and the bot's name 
  console.log('Connected to ' + team.name + ' as ' + user.name);
});



slack.start();