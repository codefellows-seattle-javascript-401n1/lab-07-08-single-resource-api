'use strict';

const Note = require('../note-model/note');
const response = require('../lib/response');

var notePool = {};

module.exports = function(router){
  router
  .post('/api/note', function(req, res){
    if (req.body.content != undefined){
      const note = new Note(req.body.content);
      notePool[note.content] = note;
      return response(200, note)(res);
    }
    response(400, 'bad request')(res);
  })
  .get('/api/note', function(req, res){
    const note = notePool[req.url.query.content];
    if (note){
      return response(200, note)(res);
    }
    if (!req.url.query){
      return response(404, 'not found')(res);
    }
    response(400, 'bad request')(res);
  })
  .delete('/api/note', function(req, res){
    if (req.body){
      const note = req.body.id;
      delete notePool[note];
      return response(200, note)(res);
    }
    response(404, 'not found')(res);
  });
};
