'use strict';

const MatchScore = require('../model/matchscore');
const response = require('../lib/response');
var matchScorePool = {};

module.exports = function(router){
  // console.log('entered matchscore-route.route');
  router.post('/api/matchscore', function(req, res){
    if(req.body){
      const matchScore = new MatchScore(req.body.distance, req.body.score, req.body.xcount);
      matchScorePool[matchScore.uuid] = matchScore;
      return response(200, matchScore)(res);
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // console.log('entered POST route: ', JSON.stringify(matchScore));
    // console.log('matchScorePool: ', matchScorePool);
    // res.write(JSON.stringify(matchScorePool[req.url.query.uuid]));
    // res.end();
    }
    response(400, 'bad request')(res);
  }).get('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      const matchScore = matchScorePool[req.url.query.uuid];
      return response(200, matchScore)(res);
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.write(JSON.stringify(matchScorePool[req.url.query.uuid]));
      // res.end();
    }
    response(404, 'not found')(res);
  }).put('/api/matchscore', function(req, res){
    if(matchScorePool[req.url.query.uuid]){
      const uuid = matchScorePool[req.url.query.uuid];
      uuid.distance = req.body.distance;
      uuid.score= req.body.score;
      uuid.xCount= req.body.xCount;
      return response(200, uuid)(res);
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.write(JSON.stringify(matchScorePool[req.url.query.uuid]));
      // res.end();
    }
    response(404, 'not found')(res);
  }).delete('/api/matchscore', function(req, res){
    if(matchScorePool[req.body.uuid]){
      const uuid = matchScorePool[req.body.uuid];
      // console.log('delete statement is true');
      delete matchScorePool[req.body.uuid];
      return response(404, uuid)(res);
      // res.writeHead(200, {'Content-Type': 'application/json'});
      // res.write('file deleted: ');
      // console.log(matchScorePool);
      // res.end();
    }
    response(404, 'not found')(res);
  });
};
