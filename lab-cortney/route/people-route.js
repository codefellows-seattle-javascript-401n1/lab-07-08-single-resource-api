'use strict';

const People = require('../model/people');
const response = require('../lib/response');

var peepPool = {}; // get it? hahahahaaahhaahaha

module.exports = function(router){
  router
  .post('/api/people', function(req, res){
    if (req.body.name){
      const person = new People(req.body.name);
      peepPool[person.id] = person;
      // console.log(peepPool);
      return response(200, person)(res);
    }
    response(400, 'bad request!');
  })
  .get('/api/people', function(req, res){
    const person = peepPool[req.query.id];
    if (person){
      return response(200, person)(res);
    }
    response(404, 'not found')(res);

  }).delete('/api/people', function(req, res){
    if (req.body){
      const person = peepPool[req.body.id];
      if (person){
        delete peepPool[req.body.id];
        return response(200, person)(res);
      }
      return response(404, 'not found')(res);
    }
  });
};
