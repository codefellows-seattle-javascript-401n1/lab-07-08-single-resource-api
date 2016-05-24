'use strict';

const urlParser = require('./url-parser');   // module for parsing the url
const bodyParser = require('./body-parser'); // module for parsing the request body

const Router = module.exports = function(){ //registers methods for a specific route
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
  return this;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;
  return function(req, res){
    console.log('route function');
    Promise.all([
      bodyParser(req),
      urlParser(req)
    ]).then(function(){
      console.log('then function');
      if(typeof routes[req.method][req.url.pathname] === 'function'){
        return routes[req.method][req.url.pathname](req, res);
      }
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify('not found'));
      res.end();
    }).catch(function(err){
      // console.log(err, 'catch block');
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(err));
      res.end();
    });
  };
};
