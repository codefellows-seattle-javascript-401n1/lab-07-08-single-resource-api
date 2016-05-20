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
    console.log('heres delete');
    if (req.body) {
      const deity = req.body.id;
      console.log('inside delete if');
      delete valhalla[deity];
      return response(200, deity)(res);
    }
    response(404, 'nothing here')(res);
  });
};
