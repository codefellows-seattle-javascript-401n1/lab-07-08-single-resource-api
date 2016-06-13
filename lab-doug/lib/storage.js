'use strict';
const fs = require('fs');
const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function(schema, item){
  return new Promise((resolve, reject) => {
    console.log('EXAMPLE OF ITEM IN SET ITEM:', item);
    var stringItem = JSON.stringify(item);
    fs.writeFile(`${this.dataDir}/${schema}/${item.uuid}.json`, stringItem, function(err){
      if(err){
        return reject(err);
      }
      return resolve(JSON.parse(stringItem));
    });
  });
};
Storage.prototype.fetchItem = function(schema, uuid){
  return new Promise((resolve, reject) => {
    var filePath = `${this.dataDir}/${schema}/${uuid}.json`;
    fs.readFile(filePath, 'utf8', function(err, data){
      if(err) return reject(data);
      try{
        var parsedItem = JSON.parse(data);
        return resolve(parsedItem);
      } catch (err){
        return reject(err);
      }
    });
  });
};

Storage.prototype.deleteItem = function(schema, uuid){
  return new Promise((resolve, reject) => {
    fs.unlink(`${this.dataDir}/${schema}/${uuid}.json`, function(err, res){
      if(err) return reject(err);
      resolve(res);
    });
  });
};
