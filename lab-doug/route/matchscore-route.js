'use strict';

const matchScore = require('../model/matchscore');
var matchScorePool = {};

module.exports = function(router){
  router.post('/api/matchscore', function(req, res){
    const matchScore = new matchScore(req.body.firstName, req.body.lastName, req.body.location, req.body.score, req.body.xcount);
    matchScorePool[matchScore.uuid] = matchScore;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(matchScore));
    res.end();
  }).get('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(matchScore[req.url.query.uuid]));
      res.end();
    }
  }).put('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      const matchScore = new matchScore(req.body.firstName, req.body.lastName, req.body.location, req.body.score, req.body.xcount);
      matchScorePool[matchScore.uuid] = matchScore;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(matchScore));
      res.end();
    }
  }).delete('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      delete(matchScorePool[req.url.query.uuid]);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('file deleted: ', JSON.stringify(matchScore));
      res.end();
    }
  });
};
