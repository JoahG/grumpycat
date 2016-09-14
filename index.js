// Start server
// Express server is only required when deploying to Heroku, 
// which requires a port binding within 60secs of startup.
var app = require('./modules/server.js');

// Set up Slack Client
var SlackClient = require('./modules/slack.js');

// Set up Event Handler
var Router = require('./modules/router.js');
