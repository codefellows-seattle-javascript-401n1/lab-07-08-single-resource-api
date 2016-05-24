'use strict';

const Npc = require('../model/npc');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const storage = new Storage('/home/sam/401/lab-07-08-single-resource-api/lab-sam/data');

module.exports = function(router){
  router.post('/api/npc', function(req, res){
    if (req.body.name && req.body.classes) {
      var npc = new Npc(req.body.name, req.body.race, req.body.classes);
      storage.setNpc('npc', npc)
      return response(200, npc)(res);
    }//there should be a .then and .catch here but they keep breaking everyhting
    response(400, 'bad request')(res);
  })
  .get('/api/npc', function(req, res){
    if (!req.url.query.id) {
      return response(400, 'bad request')(res);
    }
    storage.fetchNpc('npc', req.url.query.id)
    .then(function(npcData){
      var npc = npcData;
      if (npc) {
        return response(200, npc)(res);
      }
    })
    .catch(function(err){
      console.log(err);
      response(404, 'not found')(res);
    });
  })
  .delete('/api/npc', function(req, res){
    if (!req.body.id) {
      return response(400, 'bad request')(res);
    }
    storage.removeNpc('npc', req.body.id)
    .then(function(){
      console.log('DELETE run on', req.body.id);
      return response(200, 'Deleted')(res);
    })
    .catch(function(err){
      console.log(err);
      response(404, 'not found')(res);
    });
  });
};
