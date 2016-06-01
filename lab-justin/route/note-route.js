'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
// const Note = require('../lib/storage');
// const fs = require('fs');
// const noteStorage = new Storage()
// const note = notePool[req.url.query.id];
// const note = new Note(req.body.content);
// const dataDir = new Storage(`${__dirname}/../storage`);
var notePool = {};

module.exports = function(router){
  router.post('/api/note', function(req, res){
    if (req.body){
      let newId = req.body.id || null;
      const newNote = new Note(req.body.content, newId);
      notePool[newNote.id] = newNote;

      return response(200, newNote)(res);
    }
    response(400, 'bad request')(res);
  });

  router.get('/api/note', function(req, res){
    const note = notePool[req.url.query.id];
    if (note){
      return response(200, note)(res);
    }
    response(404 , 'not found')(res);
  });

  router.delete('/api/note', function(req, res){

    let newId = req.body.id;
    // const note = console.log(notePool[newId]);

    if(notePool[newId]){
      delete notePool[newId];
      return response(200, 'Successfully deleted')(res);
    }
    // }
    response(404, 'not found')(res);
  });

  router.put('/api/note', function(req, res){
    const note = notePool[req.body.id];
    if (note){
      notePool[req.body.id].content = req.body.content;
      return response(201, 'Updated',  note.id)(res);
    }
    response(400, 'bad request')(res);
  });


  router.get('/api/note/all', function(req, res){
    const note = notePool[req.url.query.id];
    const id = note.id;
    const arr = [];

    if(Object.keys(notePool).length === 0) {
      return response(404, 'not found')(res);
    }
    arr.push(id);
    return response(200, 'array of all of the ids: ', arr);
  });
};
