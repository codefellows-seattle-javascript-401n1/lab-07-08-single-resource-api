'use strict';

const uuid = require('node-uuid');

module.exports = function Note(content, idCust){
  this.id = idCust || uuid.v1();
  this.content = content;
  this.mathRandom = Math.floor(Math.random()*100);
  this.timestamp = new Date();
};
