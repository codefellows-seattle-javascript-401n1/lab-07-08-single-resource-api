'use strict';

const uuid = require('uuid');

module.exports = function Order(item, qty) {
  this.id = uuid.v1();
  this.created = Date.now();
  this.item = item;
  this.qty = qty;
};
