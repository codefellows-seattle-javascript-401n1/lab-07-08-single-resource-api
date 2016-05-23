'use strict';

const Note = require('../note-model/note');
const response = require('../lib/response');
const dataDir = __dirname + '/data';
const Storage = require('../lib/storage');

var storage = new Storage(dataDir);

module.exports = function(router){
  router
  .post('/api/note', function(req, res){
    if (req.body.content != undefined){
      const note = new Note(req.body);
      storage.setItem('notes', note).then(function(){
        return response(200, note)(res);
      }).catch(function(err){
        console.error(err);
      });
    } else {
      response(400, 'bad request')(res);
    }
  })
  .get('/api/note', function(req, res){
    const note = req.url.query.id;
    if (note){
      storage.fetchItem('notes', note).then(function(){
        return response(200, note)(res);
      }).catch(function(err){
        console.error(err);
        return response(404, 'not found')(res);
      });
    }
    if (!req.url.query.id){
      return response(400, 'bad request')(res);
    }
  })
  .delete('/api/note', function(req, res){
    if (req.body){
      var note = req.body.id;
      console.log(note);
      storage.deleteItem('notes', note);
      return response(200, 'note deleted')(res);
    } else {
      response(404, 'not found')(res);
    }
  });
};
