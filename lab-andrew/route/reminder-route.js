'use strict';

const Reminder = require('../model/reminder');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const reminderStorage = new Storage(`${__dirname}/../data`);
const del = require('del');



module.exports = function(router) {
  router.post('/api/reminder', function(req, res) {
    try {
      if (req.body.content){
        const reminder = new Reminder(req.body.content);

        reminderStorage.setItem('notes', reminder)
      .then(function() {
        return response(200, reminder)(res);
      }).catch(function(err) {
        console.error('error on api/reminder POST', err);
        response(500, 'server error')(res);
      });
        return;
      }
      response(400, 'bad request')(res);
    } catch(err) {

      response(400, 'bad request')(res);
    }
  })

  .get('/api/reminder', function(req, res) {
    if(!req.url.query.id) {
      return response(400, 'bad request')(res);
    }
    console.log('req.url.query', req.url.query.id);
    reminderStorage.fetchItem('notes', req.url.query.id)
    .then((reminder) => {
      return response(200, reminder)(res);
    })
    .catch((err) => {
      response(404, err)(res);
      return;
    });
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
