'use strict';

const http = require('http');
const port = process.env.PORT || 4000;

const Router = require('./lib/router');
const router = new Router();
const peepRoute = require('./route/people-route');

peepRoute(router);

const server = http.createServer(router.route());
server.isRunning = false;
module.exports = server;
// server.listen(port, function(){
//   server.isRunning = true;
//   console.log('server started on port:', port);
// });
// fdsa
