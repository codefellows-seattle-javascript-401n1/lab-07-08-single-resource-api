'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
// const uuid = require('node-uuid');

const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject) => {
    mkdirp(this.dataDir + '/' + schema, (err) => {
      if (err) console.error('ERROR AFTER MKDIRP:', err);
    });
    fs.writeFile(`${this.dataDir}/${schema}/${item.id}.json`, JSON.stringify(item), function(err){
      if (err) return reject(err);
    });
    resolve(item);
  });
};

Storage.prototype.fetchItem = function(schema, id){
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${id}.json`, function(err, item){
      if (err) return reject(err);
      try {
        item = JSON.parse(item);
        resolve(item);
      } catch(err) {
        reject(err);
      }
    });
  });
};

Storage.prototype.deleteItem = function(schema, id){
  return new Promise((resolve, reject) => {
    fs.unlink(`${this.dataDir}/${schema}/${id}.json`, function(err){
      if (err) return reject(err);
      resolve();
    });
  });
};
