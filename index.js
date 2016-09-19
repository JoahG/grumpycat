'use strict';

require('babel-register');

// * Start server
//     Express server is only required when deploying to Heroku, 
//     which requires a port binding within 60secs of startup.
// * Set up Slack Client
// * Set up Event Handler

require('./src');
