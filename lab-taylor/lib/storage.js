'use strict';

const fs = require('fs');

const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setItem = function (schema, order) {
  return new Promise((resolve, reject) => {
    const path = `${this.dataDir}/${schema}/${order.id}`;
    fs.writePath(path, JSON.stringify(order), function (err) {
      if (err) return reject(err);
      resolve(order);
    });
  });
};

Storage.prototype.fetchItme = function (schema, id) {
  return new Promise((resolve, reject) =>  {
    const path = `${this.dataDir}/${schema}/${id}`;
    fs.readFile(path, function(err, order) {
      if (err) return reject(err);
      try {
        order = JSON.parse(order);
        resolve(order);
      } catch (err) {
        reject(err);
      }
    });
  });
};
