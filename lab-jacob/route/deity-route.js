'use strict';

const Deity = require('../model/deity');
const response = require('../lib/response');

var valhalla = {};

module.exports = function(router){
  router
  .post('/api/deity', function(req, res){
    if(req.body){
      const deity = new Deity(req.body.name, req.body.power);
      valhalla[deity.id] = deity;
      return response(200, deity)(res);
    }
    response(400, 'bad request')(res);
  })
  .get('/api/deity', function(req, res){
    const deity = valhalla[req.url.query.id];
    if(deity){
      return response(200, deity)(res);
    }
    response(404, 'not found')(res);
  })
  .delete('/api/deity', function(req, res){
    if(req.body){
      delete valhalla[req.body.id];
      return response(200, 'deity deleted')(res);
    }
    response(400, 'bad request')(res);
  });
};
