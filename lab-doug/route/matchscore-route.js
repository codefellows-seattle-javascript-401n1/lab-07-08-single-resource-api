'use strict';

const MatchScore = require('../model/matchscore');
const response = require('../lib/response');
var matchScorePool = {};

module.exports = function(router){
  router.post('/api/matchscore', function(req, res){
    if(req.body){
      const matchScore = new MatchScore(req.body.distance, req.body.score, req.body.xcount);
      matchScorePool[matchScore.uuid] = matchScore;
      return response(200, matchScore)(res);
    }
    response(400, 'bad request')(res);
  }).get('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      const matchScore = matchScorePool[req.url.query.uuid];
      return response(200, matchScore)(res);
    }
    response(404, 'not found')(res);
  }).put('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      const uuid = matchScorePool[req.url.query.uuid];
      uuid.distance = req.body.distance;
      uuid.score= req.body.score;
      uuid.xCount= req.body.xCount;
      return response(200, uuid)(res);
    }
    response(404, 'not found')(res);
  }).delete('/api/matchscore', function(req, res){
    if(matchScorePool[req.body.uuid]){
      const uuid = matchScorePool[req.body.uuid];
      delete matchScorePool[req.body.uuid];
      return response(404, uuid)(res);
    }
    response(404, 'not found')(res);
  });
};
