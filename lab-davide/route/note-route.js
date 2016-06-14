'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
const storage = require('../lib/storage');


//TODO: Add storage from notes and add dataDir//
var storage = new Storage(dataDir);

module.exports = function(router){
  router
  .post('/api/note', function(req, res){
    if(req.body != undefined){
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
    var note = req.url.query.id;
    if (note) {
      storage.fetchItem('notes', note).then(function(){
      return response(200, note)(res);
    }).catch(function(err){
      console.error(err);
      response(404, 'not found')(res);
    });
  }
    if(!req.url.query.id) {

    }

  })

  // bonus -->.put('/api/note', function(req, res){
  //   const note = notePool[req.body.id];
  //   //Check that the note exists
    //Store the data somewhere
    //Replace the old data with new data
    //Return new data


  .delete('api/note', function(req, res){
    if (req.body){
    var note = req.body.id;
    console.log(note);
    storage.deleteItem('notes', note).then(function(){
      return response(200, 'note is deleted')(res);
      console.error(err);
      response(404, 'not found')(res);
  });
};
