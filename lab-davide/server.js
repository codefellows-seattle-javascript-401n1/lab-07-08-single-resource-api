'use strict';

//loaded http module that is built in node//
const http = require('http');
const Router = require('./lib/router');
const router = new Router();
const noteRoute = require('./route/note-route');
//created const var port that is being assigned the env variable//
const port = process.env.PORT || 3000;

noteRoute(router);

//created a server using http module. takes a call. http.createServer is looking
//for any function that takes in a req, res as its argument//
const server = module.exports = http.createServer(router.route());

server.listen(port, function (){
  server.isRunning = true;
});
