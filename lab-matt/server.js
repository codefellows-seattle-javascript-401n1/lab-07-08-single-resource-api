'use strict'

const http = require('http');

const port = process.end.PORT || 3000;

const server = http.createServer(router.route());

server.listen(port, function(){
  console.log('server up :::', port);
});
