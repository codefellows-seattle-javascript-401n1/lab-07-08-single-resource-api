'use strict';

const http = require('http');
//const Router = require(__dirname + 'Router');
const port = process.argv[2] || 3000;
//const router = new Router();


const server = http.createServer(function(req, res){
  console.log(res);
});
server.listen(port, function(){
  console.log('http server started up on port: ', port);
});
