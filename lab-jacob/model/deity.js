'use strict';

const uuid = require('node-uuid');

module.exports = function Deity(name, power){
  this.id = uuid.v1();
  this.name = name;
  this.power = power;
};
