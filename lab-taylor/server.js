'use strict';

const http = require('http');
const port = process.env.PORT || 3000;
const Router = require('./lib/router');
const router = new Router();

const orderRoute = require('./route/order-route');
orderRoute(router);

const server = module.exports = http.createServer(router.route());

server.listen(port, function () {
  this.isRunning = true;
  console.log(`server is running on ${port}`);
});
