'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();
const npcRoute = require('./route/npc-route');

npcRoute(router);

const server = module.exports = http.createServer(router.route());

server.listen(port, function(){
  server.isRunning = true;
  console.log('server up :::', port);
});
