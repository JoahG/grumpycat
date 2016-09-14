var connection = require('../slack.js').connection,
    PermissionsUser = require('../models/index.js').PermissionsUser;

module.exports = function(userId, callback) {
  if (process.env.BANNED_USERS && process.env.BANNED_USERS.split(',').indexOf(connection.dataStore.getUserById(userId).name) > -1) {
    callback(true);
    return;
  }

  PermissionsUser.find({
    id: userId,
    isBanned: true
  }, function(err, user) {
    if (user.length > 0) {
      callback(true);
      return;
    } else {
      callback(false);
      return;
    }
  });
};