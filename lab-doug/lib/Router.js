'use strict';

const parseUrl = require('./parse-url');

const Router = module.exports = function(){
  //object that stores routes
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};
//methods used to register routes
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;//I do not understand why we need this
  return function(req, res){
    parseUrl(req).then(function(){
      if(typeof routes[req.method][req.url.pathname] === 'function'){
        return routes[req.method][req.url.pathname](req, res);
      }
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify('not found'));
      res.end();
    });
  };
};
