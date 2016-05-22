'use strict';

const http = require('http');
const noteRoute = require('./routes/note-route');
const Router = require('./lib/router');
const port = process.env.PORT || 3000;
const router = new Router();

noteRoute(router);

const server = module.exports = http.createServer(router.route());

server.listen(port, function(){
  server.isRunning = true;
  console.log('server up:', port);
});
