'use strict';

const http = require('http');
const Router = require(__dirname + '/lib/Router');
const port = process.env.PORT || 3000;
const router = new Router();


const server = http.createServer(router.route());

server.listen(port, function(){
  console.log('http server started up on port: ', port);
});
