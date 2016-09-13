var SlackClient = require('@slack/client');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Everything is 200 OK');
});

app.listen(process.env.PORT || 8080);


var store = {};


var slack = new SlackClient.RtmClient(process.env.SLACK_API_TOKEN || '', {
  logLevel: 'error',
  dataStore: new SlackClient.MemoryDataStore()
});


var CLIENT_EVENTS = SlackClient.CLIENT_EVENTS;
 
slack.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  // Get the user's name 
  var user = slack.dataStore.getUserById(slack.activeUserId);
 
  // Get the team's name 
  var team = slack.dataStore.getTeamById(slack.activeTeamId);
 
  // Log the slack team name and the bot's name 
  console.log('Connected to ' + team.name + ' as ' + user.name);
});


var RTM_EVENTS = SlackClient.RTM_EVENTS;


slack.on(RTM_EVENTS.MESSAGE, function (message) {
  var user = slack.dataStore.getUserById(message.user)

  // Listens to all `message` events from the team 
  console.log(user.name + ' said "' + message.text);

  if (/\<\@\w+\>(\+\+)/gi.test(message.text)) {
    var targetedUser = slack.dataStore.getUserById(message.text.match(/\<\@\w+\>/gi)[0].split('<@')[1].split('>')[0]);

    if (targetedUser.name == user.name) {
      slack.sendMessage('you can\'t upvote yourself, dumbass', message.channel);
      return;
    }

    if (!store[targetedUser.name]) store[targetedUser.name] = 0;
    slack.sendMessage('@' + targetedUser.name + ' now has ' + ++store[targetedUser.name] + ' karma points.', message.channel)
  } else if (/\<\@\w+\>(\-\-)/gi.test(message.text)) {
    var targetedUser = slack.dataStore.getUserById(message.text.match(/\<\@\w+\>/gi)[0].split('<@')[1].split('>')[0]);

    if (!store[targetedUser.name]) store[targetedUser.name] = 0;
    slack.sendMessage('@' + targetedUser.name + ' now has ' + --store[targetedUser.name] + ' karma points.', message.channel)
  }
});


slack.start();