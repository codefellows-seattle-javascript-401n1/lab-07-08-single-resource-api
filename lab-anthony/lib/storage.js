'use strict';

const fs = require('fs');

const storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject)=>{
    fs.writeFile(`${this.dataDir}/${schema}/${item.id}`, JSON.stringify(item), function(err) {
      if(err) return reject(err);
      resolve(item);
    });
  });
};

storage.prototype.fetchItem = function(schema, itemId){
  return new Promise((resolve, reject)=>{
    fs.readFile(`${this.dataDir}/${schema}/${itemId}`, function(err, item){
      if(err) return reject(err);
      item = JSON.parse(item);
      resolve(item);
    });
  });
};

storage.prototype.deleteItem = function(schema, itemId){
  return new Promise((resolve, reject)=>{
    fs.unlink(`${this.dataDir}/${schema}/${itemId}`, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
};
