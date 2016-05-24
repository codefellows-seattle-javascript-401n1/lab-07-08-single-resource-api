'use strict';

const fs = require('fs');

const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.createDeity = function(schema, deity){ // sets item in specified data directory
  return new Promise((resolve, reject) => {
    fs.writeFile(`${this.dataDir}/${schema}/${deity.id}`, JSON.stringify(deity), function(err){
      if(err) return reject(err);
      resolve(deity);
    });
  });
};

Storage.prototype.fetchDeity = function(schema, id){ // fetches item from specified data storage directory
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${id}`, function(err, deity){
      if (err) return reject(err);
      try {
        deity = JSON.parse(deity);
        resolve(deity);
      } catch (err) {
        reject(err);
      }
    });
  });
};

Storage.prototype.deleteDeity = function(schema, deity){ // deletes deity from data storage
  return new Promise((resolve, reject) => {
    fs.unlink(`${this.dataDir}/${schema}/${deity.id}`, function(err){
      if (err) return (err);
      try{
        resolve(err);
      } catch (err) {
        reject(err);
      }
    });
  });
};
