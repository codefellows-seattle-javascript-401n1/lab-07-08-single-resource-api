'use strict';

const Npc = require('../model/npc');
const response = require('../lib/response');

var npcPool = {};

module.exports = function(router){
  router.post('/api/npc', function(req, res){
    if (req.body.name && req.body.classes) {
      const npc = new Npc(req.body.name, req.body.race, req.body.classes);
      npcPool[npc.id] = npc;
      console.log(npc);
      return response(200, npc)(res);
    }
    response(400, 'bad request')(res);
  })
  .get('/api/npc', function(req, res){
    console.log('get hit');
    const npc = npcPool[req.url.query.id];
    if (npc) {
      return response(200, npc)(res);
    }
    if (!req.url.query.id) {
      return response(400, 'bad request')(res);
    }
    response(404, 'not found')(res);
  })
  .delete('/api/npc', function(req, res){
    if (npcPool[req.body.id]) {
      delete npcPool[req.body.id];
      return response(200, 'Deleted')(res);
    }
    response(404, 'not found')(res);
  });
};
