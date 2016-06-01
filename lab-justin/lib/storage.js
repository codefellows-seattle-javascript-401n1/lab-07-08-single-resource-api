'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject) => {
    fs.writeFile(`${this.dataDir}/${schema}/${item.id}`, JSON.stringify(item), function(err){
      if (err) return reject(err);
      return resolve(item);
    });
  });
};

Storage.prototype.fetchItem = function(schema, info){
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${info.id}`, function(err, item){
      if (err) return reject(err);
      try {
        item = JSON.parse(item);
        return resolve(item);
      } catch(err){
        return reject(err);
      }
    });
  });
};

Storage.prototype.deleteItem = function(schema, id){
  return new Promise((resolve, reject) => {
    //former err -> id
    fs.unlink(`${this.dataDir}/${schema}/${id}`, function(schema, err){
      if(err) return reject(err);
      return resolve();
    });
  });
};
//

Storage.prototype.createSubDir = function(schema, item){
  return new Promise((resolve, reject) => {
    mkdirp(this.dataDir + '/', schema, (err) => {
      if(err) console.error('Failed to create dub directory', err);
    });
    fs.writeFile(`${this.dataDir}/${schema}/${item.id}.JSON`, JSON.stringify(item), function(err){
      if (err) return reject(err);
      resolve(item);
    });
  });
};
