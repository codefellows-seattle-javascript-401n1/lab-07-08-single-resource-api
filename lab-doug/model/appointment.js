'use strict';

const uuid = require(node-uuid);

module.exports = function Appointment(firstName, LastName, carModel){
  this.uuid = uuid.v4();
  this.firstName = firstname;
  this.lastName = lastName;
  this.creartedOn = new Date();
  this.carModel = carModel;
};
