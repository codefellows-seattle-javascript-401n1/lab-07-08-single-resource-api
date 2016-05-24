'use strict';

const Model = require('../model/model');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const newStorage = new Storage(`${__dirname}/../data`);
const del = require('del');

var modelPool = {};

module.exports = function(router){
  router.post('/api/model/create', function(req, res){
    try {
      if (req.body){
        req.body = JSON.parse(req.body);
        const model = new Model(req.body.name);
        modelPool[req.body.id] = model;
        newStorage.setItem('model', model)
        .then(function(){
          return response(200, model)(res);
        }).catch(function(err){
          console.error('Error in api/model POST:', err);
          response(500, 'server error')(res);
        });
        return;
      }

      response(400, 'bad request')(res);
    } catch(err) {
      response(400, 'bad request')(res);
    }



  }).get('/api/model/fetch', function(req, res){
    if(!req.url.query.id) {
      return response(400, 'bad request')(res);
    }
    try{
      newStorage.fetchItem('model', req.url.query).then(function(model){
        return response(200, model)(res);
      }).catch(() => {
        response(404, 'not found')(res);
      });
    } catch(err){
      return response(404, 'not found')(res);
    }



  }).delete('/api/model/delete', function(req, res){
    try{
      if(req.body){
        req.body = JSON.parse(req.body);
        if (modelPool[req.body.id]){
          del([`${__dirname}/../data/model/` + req.body.id]).then(() => {
            delete modelPool[req.body.id];
            console.log('Deleted file:', req.body.id);
          });
          return response(200, 'success')(res);
        }
        response(404, 'not found')(res);
      }
      response(400, 'bad request')(res);
    } catch(err){
      response(400, 'bad request')(res);
    }
  });
};
