'use strict';

const Note = require('../model/note');
const response = require('../lib/response');

var notePool = {};

module.exports = function(router) {
  router
    .post('/api/note', function(req, res) {
      if (req.body && req.body.content){
        const note = new Note(req.body.content);
        notePool[note.id] = note;
        console.log(notePool);
        return response(200, note)(res);
      }
      response(400, 'bad request')(res);
    })
    .get('/api/note', function(req, res) {
      console.log('called GET');
      const note = notePool[req.url.query.id];
      if(!req.url.query.id) {
        return response(400, 'bad request')(res);
      }

      if(note) {
        return response(200, note)(res);
      }
      response(404, 'not found')(res);
    })
    .delete('/api/note', function(req, res) {
      const note = notePool[req.body.id];
      if (note) {
        delete notePool[note.id];
        return response(200, 'Delete successful')(res);
      }
      response(404, 'not found')(res);
    });
};
