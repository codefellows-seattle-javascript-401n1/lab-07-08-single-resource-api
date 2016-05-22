'use strict';

const Reminder = require('../model/reminder');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const newStorage = new Storage(`${__dirname}/../data/`);
const del = require('del');

const reminderPool = {};

module.exports = function(router) {
  router.post('/api/reminder', function(req, res) {
    const reminder = new Reminder(req.body.id);
    if (reminder){
      reminder.content = req.body.content || req.content;
      reminder.remindMe = req.body.remindMe || req.remindMe;
      reminderPool[reminder.body] = reminder;
      newStorage.setItem('notes', reminder);
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
  if (`${__dirname}/../data/notes/${req.body.id}`) {
    del(`${__dirname}/../data/notes/${req.body.id}`).then(() => {
      console.log(`DELETED: ${__dirname}/../data/notes?id=${req.body.id}` );
    });
    return response(200, 'deleted')(res);
  }
  response(404, 'not found')(res);
});
};
