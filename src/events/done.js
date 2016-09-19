'use strict';

import { connection } from '../slack.js';
import { Task } from '../models';
import permissions from '../permissions';
import moment from 'moment';
import 'moment-timezone';

var DoneHandler = function(message) {
  var actingUser = message.user,
      userObj = connection.dataStore.getUserById(actingUser);

  if (/^!done\s(.+)/.test(message.text)) {
    var newTask = new Task({
      task: /^!done\s(.+)/.exec(message.text)[1],
      created_by: actingUser,
      completed_at: new Date()
    });

    newTask.save(function() {
      connection.sendMessage(moment(newTask.completed_at).tz(userObj.tz).format('h:mma') + ': ' + newTask.task, message.channel);
    });
  } else {
    Task.find({
      created_by: actingUser,
      completed_at: {
        $gte: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate()),
        $lt: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + 1)
      }
    }, function(err, tasks) {
      if (tasks.length > 0) {
        connection.sendMessage('You have completed today: \n' + tasks.map(function(task) {
          return '   - ' + moment(task.completed_at).tz(userObj.tz).format('h:mma') + ': ' + task.task;
        }).join('\n'), message.channel)
      } else {
        connection.sendMessage('You don\'t have any completed tasks today.', message.channel)
      }
    });
  }
};

export default {
  exec: DoneHandler,
  test: function(messageText) {
    return /^!done\s?(.+)?/.test(messageText);
  }
};