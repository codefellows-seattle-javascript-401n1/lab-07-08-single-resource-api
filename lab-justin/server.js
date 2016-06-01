'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

const Router = require('./lib/router');
const router = new Router();
const noteRoute = require('./route/note-route');
// const noteRouteTwo = require('./route/note-route-two');//

noteRoute(router);
// noteRouteTwo(router);//

const server = module.exports = http.createServer(router.route());

server.listen(port, function(){
  server.isRunning = true;
  console.log('Server is Running! @', port);
});
