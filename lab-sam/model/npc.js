'use strict';

const uuid = require('node-uuid');

module.exports = function Npc(name, race, class, level){
  this.id = uuid.v1();
  this.name = name;
  this.race = race;
  this.class = class;
  this.level = level;
};
