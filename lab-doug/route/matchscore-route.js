'use strict';

const MatchScore = require('../model/matchscore');
var matchScorePool = {};

module.exports = function(router){
  console.log('entered matchscore-route.route');
  router.post('/api/matchscore', function(req, res){
    const matchScore = new MatchScore(req.body.distance, req.body.score, req.body.xcount);
    matchScorePool[matchScore.uuid] = matchScore;
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log('entered POST route: ', JSON.stringify(matchScore));
    console.log('matchScorePool: ', matchScorePool);
    res.end();
  }).get('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(matchScorePool[req.url.query.uuid]));
      res.end();
    }
  }).put('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      var uuid = matchScorePool[req.url.query.uuid];
      uuid.distance = req.body.distance;
      uuid.score= req.body.score;
      uuid.xCount= req.body.xCount;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(matchScorePool[req.url.query.uuid]));
      res.end();
    }
  }).delete('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      delete matchScorePool[req.url.query.uuid];
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('file deleted: ', JSON.stringify(matchScorePool[req.url.query.uuid]));
      res.end();
    }
  });
};
