'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
const Storage = require('../lib/storage');

const dataDir = new Storage(`${__dirname}/../data`);

var notePool = {};

module.exports = function(router) {
  router
    .post('/api/note', function(req, res) {
      if (!req.body || !req.body.content) {
        return response(400, 'bad request')(res);
      }

      const note = new Note(req.body.content);
      notePool[note.id] = note;
      console.log(note);
      dataDir.setItem('notes', note).then(function(item){
        console.log('the note is ', item);
        return response(200, item)(res);
      }).catch(function(err){
        console.log(err);
        return response(400, 'bad request')(res);
      });
    })
    .get('/api/note', function(req, res) {
      const noteId = req.url.query.id;
      if(!req.url.query.id) {
        return response(400, 'bad request')(res);
      }
      console.log('The noteId is, ', noteId);
      dataDir.fetchItem('notes', noteId).then(function(item){
        return response(200, item)(res);
      }).catch(function(err){
        console.log('The error caught is ', err);
        return response(404, 'not found')(res);
      });
    })
    .get('/api/note/all', function(req, res){
      const idArray = [];
      if(Object.keys(notePool).length === 0) {
        return response(404, 'not found')(res);
      }
      for (var id in notePool) {
        idArray.push(id);
      }
      response(200, idArray)(res);
    })
    .delete('/api/note', function(req, res) {
      const noteId = req.body.id;
      if(!req.body.id) {
        return response(400, 'bad request')(res);
      }
      dataDir.deleteItem('notes', noteId).then(function(){
        return response(200, 'Delete successful!')(res);
      }).catch(function(err){
        console.log('The error caught is ', err);
        return response(404, 'not found')(res);
      });
    });
};
