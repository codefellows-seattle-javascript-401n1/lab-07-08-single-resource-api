'use strict';

const uuid = require('node-uuid');

module.exports = function MatchScore(distance, score, xCount){
  this.uuid = uuid.v4();
  this.distance = distance;
  this.score = score;
  this.xCount = xCount;
};
