'use strict';

const Model = require('../model/model');
const response = require('../lib/response');

var modelPool = {};

module.exports = function(router){
  router.post('/api/model', function(req, res){
    if (req.body){
      const model = new Model(req.body.name);
      modelPool[model.id] = model;
      return response(200, model)(res);
    }
    response(400, 'bad request')(res);
  }).get('/api/model', function(req, res){
    const model = modelPool[req.url.query.id];
    if (model){
      return response(200, model)(res);
    }
    response(404, 'not found')(res);
  }).delete('/api/model', function(req, res){
    console.log('hit delete /api/model');

    if (req.body && req.body.id && modelPool[req.body.id]){
      delete modelPool[req.body.id];
      return response(200, 'success')(res);
    }
    response(404, 'not found')(res);
  });
};
