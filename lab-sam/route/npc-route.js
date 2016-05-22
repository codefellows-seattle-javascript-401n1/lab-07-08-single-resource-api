'use strict';

const Npc = require('../model/npc');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const storage = new Storage('/home/sam/401/lab-07-08-single-resource-api/lab-sam/data');

module.exports = function(router){
  router.post('/api/npc', function(req, res){
    if (req.body.name && req.body.classes) {
      const npc = new Npc(req.body.name, req.body.race, req.body.classes);
      storage.setNpc('npc', npc);
      console.log(npc);
      return response(200, npc)(res);
    }
    response(400, 'bad request')(res);
  })
  .get('/api/npc', function(req, res){
    if (!req.url.query.id) {
      return response(400, 'bad request')(res);
    }
    storage.fetchNpc('npc', req.url.query.id)
    .then(function(npcData){
      var npc = npcData;
      console.log('GET NPC', npc);
      if (npc) {
        return response(200, npc)(res);
      }
    })
    .catch(function(err){
      response(404, 'not found')(res);
    });
  })
  .delete('/api/npc', function(req, res){
    if (!req.body.id) {
      console.log('DELETE 404ed');
      return response(400, 'bad request')(res);
    }
    console.log('DELETE id =',req.body.id);
    storage.removeNpc('npc', req.body.id)
    .then(function(id){
      console.log('DELETE run on', id);
    })
    .catch(function(err){
      response(404, 'not found')(res);
    });
  });
};
