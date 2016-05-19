'use strict';

//requirning the parse method from the url module//
const parseUrl = require('url').parse;

//return a constructor that is going to be a new object for our route.//
//creating a router with a var to add things to this prototype //
const Router = module.exports = function(){

//going to rout a single property on this. route going to be an object. That object
//is goinng to have a property for GET, POST, PUT, DELETE//
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};


//register a callback for a specific endpoint for one of the following routes.//
Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;
  return function(req, res){
    req.url = parseUrl(req.url);
    if(typeof routes[req.method][req.url.pathname] === 'function'){
      return routes[req.method][req.url.pathname](req, res);
    }




    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write('not found');
    res.end();
  };
};
