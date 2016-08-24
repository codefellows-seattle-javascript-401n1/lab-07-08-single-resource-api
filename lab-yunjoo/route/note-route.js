'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const storage = new Storage(`${__dirname}/../data`);


module.exports = function(router){
  router
  .post('/api/note', function(req,res){
    if(req.body){
      const note = new Note(req.body.content);
      if (req.body.content) {
        storage.setItem('note', note)
        .then(item => response(200, item)(res))
        .catch(() => response(400, 'bad request')(res));
        return;
      }
    }
    response(400, 'bad request')(res);

  })
  .get('/api/note', function(req,res){
    if(!req.url.query.id){
      return response(400, 'bad request')(res);
    }
    storage.fetchItem('note',req.url.query.id)
    .then(note => response(200, note)(res))
    .catch(() => response(404, 'not found')(res));
  })
  .put('/api/note', function(req,res){
    if(req.body.id){
      storage.updateItem('note', req.body)
      .then(data => response(201, data)(res))
      .catch(() => response(400, 'bad request')(res));
    } else{
      response(400, 'bad request')(res);
    }
  })
  .delete('/api/note', function(req,res){
    if(req.url.query.id){
      storage.deleteItem('note',req.url.query.id)
      .then(()=> response(204, 'No content!')(res))
      .catch((err) => {
        console.log(err);
        return response(400, err)(res);

      });
    } else {
      console.log('bad request');
      response(400, 'bad request!')(res);
    }
  });
};
