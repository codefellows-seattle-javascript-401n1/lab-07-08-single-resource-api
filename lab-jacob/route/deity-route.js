'use strict';

const Deity = require('../model/deity');
const response = require('../lib/response');

var olympus = {};

module.exports = function(router){
  router
  .post('api/deity', function(req, res){
    if(req.body){
      const deity = new Deity(req.body.name, req.body.power);
      olympus[deity.id] = deity;
      response(200, deity)(res);
    }
    response(400, 'bad request')(res);
  })
  .get('api/deity', function(req, res){
    const deity = olympus[req.url.query.id];
    if(deity){
      response(200, deity)(res);
    }
    response(400, 'badrequest')(res);
  })
  .delete('api/deity', function(req, res){
    if(req.body){
      delete olympus[req.url.query.id];
      return response(200, 'deity deleted')(res);
    }
    response(400, 'bad request')(res);
  });
};
