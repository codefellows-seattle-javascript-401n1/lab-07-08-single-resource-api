'use strict';

const uuid = require('node-uuid');

module.exports = function Note(content){
  this.id = uuid.v4();
  this.content = content;
  this.timestamp =  new Date();
};
