'use strict';

const http = require('http');
const Router = require(`${__dirname}/lib/router`);
const port = process.env.PORT || 3000;
const router = new Router();
const matchScoreRoute = require('./route/matchscore-route');

//register routes on router object constructed above
matchScoreRoute(router);
/*the createServer is looking for a function that takes req and res as its arguments.  the router.route() returns a function that takes req and res as its arguments*/
const server = module.exports = http.createServer(router.route());
server.listen(port, function(){
  server.isRunning = true;
  console.log('http server started on port: ', port);
});
