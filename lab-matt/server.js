'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();
const modelRoute = require('./route/model-route');

modelRoute(router);

const server = module.exports = http.createServer(router.route());

server.listen(port, function(){
  server.isRunning = true;
  console.log('Server is running on port: ', port);
});
