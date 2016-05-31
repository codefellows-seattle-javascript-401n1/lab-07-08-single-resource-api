'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const deityRoute = require('./route/deity-route');
const Router = require('./lib/router');
const router = new Router();


deityRoute(router);

const server = module.exports = http.createServer(router.route());

server.listen(PORT, function(){
  server.isRunning = true;
  console.log('server is up on port: ', PORT);
});
