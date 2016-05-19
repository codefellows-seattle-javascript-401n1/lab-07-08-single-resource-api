'use strict';

const uuid = require('node-uuid');

module.exports = function Note(name){
  this.id = uuid.v1();
  this.name = name;
  this.luckNumber = Math.floor(Math.random() * 10);
  this.timestamp = new Date();

};
