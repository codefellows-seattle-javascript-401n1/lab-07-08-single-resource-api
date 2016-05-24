'use strict';

const fs = require('fs');
const del = require('del');

const Storage = module.exports = function(dataDir){
  this.dataDir = dataDir;
};

Storage.prototype.setNpc = function(schema, npc){
  return new Promise((resolve, reject) => {
    fs.writeFile(`${this.dataDir}/${schema}/${npc.id}`, JSON.stringify(npc), function(err){
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(npc);
    });
    console.log('storage SETNPC fired', npc);
  });
};

Storage.prototype.fetchNpc = function(schema, id){
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.dataDir}/${schema}/${id}`, 'utf8', (err, npcData) => {
      console.log('FetchNPC =', npcData);
      if (err) return reject(err);
      try {
        npcData = JSON.parse(npcData);
        resolve(npcData);
      } catch(err) {
        reject(err);
      }
    });
  });
};

Storage.prototype.removeNpc = function(schema, id){
  return new Promise((resolve, reject) => {
    var uuID = `${this.dataDir}/${schema}/${id}`;
    console.log('callin func removeNpc w/ id', uuID);
    del([uuID])
    .then(function(){
      console.log('storage removeNpc run');
      resolve();
    })
    .catch(function(err){
      if (err) {
        reject(err);
        return;
      }
    });
  });
};
