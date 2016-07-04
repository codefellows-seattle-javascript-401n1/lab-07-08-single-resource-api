'use strict';

const Note = require('../model/note');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const debug = require('debug')('note:note-route-route');

var noteStorage = new Storage(`${__dirname}/../data`);

var notePool = {};

module.exports = function(router) {

  router.post('/api/note', function(req, res) {
    debug('hitting /api/note post in note-route-route');

    if(!req.body) {
      return response(400, 'bad request')(res);
    }
    if(!req.body.content) {
      return response(400, 'bad request')(res);
    }

    const note = new Note(req.body.content);
    notePool[note.id] = note;
    noteStorage.setItem('notes', note).then(function(item){
      return response(200, item)(res);
    }).catch(function(err){
      //needed this here to work//
      console.log(err);
      return response(400, 'bad request')(res);
    });
  })

  .get('/api/note', function(req, res) {
    const noteId = req.url.query.id;

    if (!req.url.query.id) {
      return response(400, 'bad request')(res);
    }

    noteStorage.fetchItem('notes', noteId)
    .then((item) => {
      return response(200, item)(res);
    }).catch(function(err) {
      err;
      return response(404, 'not found')(res);
    });
  });
};
