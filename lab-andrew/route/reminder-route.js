'use strict';

const Reminder = require('../model/reminder');
const response = require('../lib/response');

const reminderPool = {};

module.exports = function(router) {
  router.post('/api/reminder', function(req, res) {
    const reminder = new Reminder(req.body.id);
    if (reminder){
      reminder.content = req.body.content || req.content;
      reminder.remindMe = req.body.remindMe || req.remindMe;
      reminderPool[reminder.body] = reminder;
      return response(200, reminder)(res);
    }
    response(400, 'bad request')(res);
  })
  .put('/api/reminder', function(req, res) {
    const reminder = reminderPool[req.body.id];
    if (reminder) {
      reminder.id = req.body.id || req.id;
      reminder.remindMe = req.body.remindMe || req.remindMe;
      reminderPool[reminder.id] = reminder;
      return response(200, reminder)(res);
    }
    response(404, 'not found')(res);
  })
  .get('/api/reminder', function(req, res) {
    const reminder = reminderPool[req.url.query.id];
    if(reminder) {
      return response(200, reminder)(res);
    }
    response(404, 'not found')(res);
  })
.delete('/api/reminder', function(req, res) {
  console.log('delete');
  if (req.body) {
    console.log(req.url.query.id);
    delete reminderPool[req.body.id];
    return response(200, 'deleted')(res);
  }
  response(404, 'not found')(res);
});
};
