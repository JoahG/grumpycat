var connection = require('../slack.js').connection;

module.exports = function(userId) {
  if (!process.env.BANNED_USERS) return false;

  if (JSON.parse(process.env.BANNED_USERS).indexOf(connection.dataStore.getUserById(userId).name) > -1) {
    return true;
  }

  return false;
};