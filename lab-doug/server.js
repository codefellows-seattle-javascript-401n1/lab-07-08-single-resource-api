'use strict';

const http = require('http');
const Router = require(__dirname + '/lib/router');

const port = process.env.PORT || 3000;
const router = new Router();

//register this route on router object constructed above
router.get('/api/matchscore', function(req, res){
  res.writeHead(200);
  res.write(JSON.stringify('you reached the home'));
  res.end();
});

/*the createServer is looking for a function that takes req and res as its arguments.  the router.route() returns a function that takes req and res as its arguments*/
const server = http.createServer(router.route());
server.listen(port, function(){
  console.log('http server started up on port: ', port);
});
