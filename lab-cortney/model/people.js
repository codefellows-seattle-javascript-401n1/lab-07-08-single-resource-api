'use strict';

const uuid = require('node-uuid');

module.exports = function People(name){
  this.id = uuid.v1();
  this.name = name;
  this.creationDate = new Date();
};
