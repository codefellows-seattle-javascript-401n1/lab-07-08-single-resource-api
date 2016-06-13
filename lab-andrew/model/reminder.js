'use strict';

const uuid = require('node-uuid');

module.exports = function(content, remindMe) {
  this.id = uuid.v1();
  this.content = content;
  this.dateCreated = new Date();
  this.remindMe = remindMe;
};
