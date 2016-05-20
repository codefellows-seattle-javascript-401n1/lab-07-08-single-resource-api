'use strict';

const fs = require('fs');
const del = require('del');

const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setOrder = function (schema, order) {
  return new Promise((resolve, reject) => {
    const path = `${this.dataDir}/${schema}/${order.id}`;
    fs.writeFile(path, JSON.stringify(order), function (err) {
      if (err) return reject(err);
      resolve(order);
    });
  });
};

Storage.prototype.fetchOrder = function (schema, id) {
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

Storage.prototype.removeOrder = function (schema, id) {
  return new Promise((resovle, reject) => {
    const path = `${this.dataDir}/${schema}/${id}`;
    del(path).then((path) => {
      resovle(path);
    })
    .catch((path) => {
      reject(path);
    });
  });
};
