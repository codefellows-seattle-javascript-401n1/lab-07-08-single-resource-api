'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
const Storage = require('../lib/storage');

//TODO: change this to dataDir and update storage//
var storage = new Storage(`${__dirname}/../data`);

//POST 200 & 400//
module.exports = function(router){
  router
  .post('/api/note', function(req, res){
    var note = new Note(req.body.content);
    if(!req.body.content){
      return response(400, 'bad request');
    }
    storage.setItem('notes', note).then(function(){
      return response(200, note)(res);
    }).catch(function(err){
      console.log(err);
      return response(400, 'bad request')(res);
    });
  })


//GET 200 & 404//
  .get('/api/note', function(req, res){
    var note = req.url.query.id;
    if (!req.url.id){
      return response(400, 'bad request')(res);
    }
    console.log('working');
    storage.fetchItem('notes', note).then(function(){
      return response(200, note)(res);
    }).catch(function(err){
      err;
      return response(404, 'not found')(res);
    });
  })

//DELETE 200, 400, & 404//
  .delete('/api/note', function(req, res){
    var note = req.body.id;
    if (!req.body.id){
      return response(400, 'bad request')(res);
    }
    storage.deleteItem('notes', note).then(function(){
      return response(200, 'note is deleted')(res);
    }).catch(function(err){
      err;
      return response(404, 'not found')(res);
    });
  });
};
