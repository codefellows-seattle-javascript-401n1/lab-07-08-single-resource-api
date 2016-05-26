'use strict';

//const MatchScore = require('../model/matchscore');
const response = require('../lib/response');
const Storage = require('../lib/Storage');
const uuid = require('node-uuid');
var matchScoreStorage = new Storage(__dirname + '/../test/data');
var matchScorePool = {};

module.exports = function(router){
  router.post('/api/matchscore', function(req, res){
    if(req.body){
      var postUuid = uuid.v4();
      req.body.uuid = postUuid;
      matchScoreStorage.setItem('matchscore', req.body)
      .then(function(item){
        response(200, item)(res);
      }).catch(function(err){
        response(400, 'bad request')(res);
      });
    } else {
      response(404, 'not found')(res);
    }
  }).get('/api/matchscore', function(req, res){
    matchScoreStorage.fetchItem('matchscore', req.url.query.uuid)
    .then(function(item){
      console.log('value of item in "then" in matchscore-route.js: ', item);
      return response(200, item)(res);
    }).catch(function(err){
      return response(400, 'bad request in matchsocre-route.js')(res);
    });

    //response(404, 'not found in matchscore-route.js')(res);
  }).delete('/api/matchscore', function(req, res){
    if(matchScorePool[req.body.uuid]){
      const uuid = matchScorePool[req.body.uuid];
      delete matchScorePool[req.body.uuid];
      return response(404, uuid)(res);
    }
    response(404, 'not found')(res);
  });
};
