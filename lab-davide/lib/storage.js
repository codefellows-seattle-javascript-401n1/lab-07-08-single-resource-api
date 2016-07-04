'use strict';

const fs = require('fs');
const debug = require('debug')('note:storage');

//we are creating an object constructor and saving it to dataDir//
const storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

storage.prototype.setItem = function(schema, note) {
  debug('hitting setItem');
  return new Promise((resolve, reject) => {
    fs.writeFile(`${this.dataDir}/${schema}/${note.id}`, JSON.stringify(note), function(err) {
      if (err) return reject(err);
      resolve(note);
    });
  });
};

storage.prototype.fetchItem = function(schema, id){
  debug('hitting fetchItem');
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${id}`, function(err, note){
      if (err) return reject(err);
      note = JSON.parse(note);
      resolve(note);
    });
  });
};


storage.prototype.deleteItem = function(schema, noteId){
  return new Promise((resolve, reject) => {
    fs.unlink(`${this.dataDir}/${schema}/${noteId}`, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
};
