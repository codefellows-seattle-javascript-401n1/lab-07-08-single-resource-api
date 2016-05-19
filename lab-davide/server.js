'use strict';

//loaded http module that is built in node//
const http = require('http');

//created const var port that is being assigned the env variable//
const port = process.env.PORT || 3000;


//created a server using http module. tkakes a call n//
const server = http.createServer(function(req, res){
  console.log('new request form', req.url);
});

server.listen(port, function (){
  console.log('server is up: :::', port );
});
