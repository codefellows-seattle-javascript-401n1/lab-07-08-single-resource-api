'use strict';

const http = require('http');
const port = process.env.PORT || 3000;
const Router = require('./lib/router');

const router = new Router();
const server = http.createServer(router.route());

server.listen(port, function () {
  console.log(`server is running on ${port}`);
});
