'use strict';
console.log('test');
const http = require('http');
const Router = require(__dirname + '/lib/Router');
const port = process.env.PORT || 3000;
const router = new Router();
console.log('empty router object: ', router);

//register this route on router object constructed above
router.get('/api/matchscore', function(req, res){
  res.writeHead(200);
  res.write('you reached the home page');
  res.end();
});
console.log('populated router object: ', router);

/*the createServer is looking for a function that takes req and res as its arguments.  the router.route() returns a function that takes req and res as its arguments*/
const server = http.createServer(router.route());
  console.log('router.route() called');
server.listen(port, function(){
  console.log('http server started up on port: ', port);
});
