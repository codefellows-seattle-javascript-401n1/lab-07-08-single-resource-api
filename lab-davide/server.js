'use strict';

//loaded http module that is built in node//
const http = require('http');
const Router = require('./lib/router');
const router = new Router();

//created const var port that is being assigned the env variable//
const port = process.env.PORT || 3000;


//Removed because routes are being written in router
// router.get('/api/note', function(req, res){
//   res.writeHead(200);
//   res.write('yaaaaaaa our router works!');
//   res.end();
//
// });
//



//created a server using http module. tkakes a call. http.createServer is looking
//for any function that takes in a req, res as its argument//
const server = http.createServer(router.route());

server.listen(port, function (){
  console.log('server is up: :::', port );
});
