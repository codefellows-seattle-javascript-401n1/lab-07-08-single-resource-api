'use strict';


//returning the parse method from the url module//
const parseUrl = require('./parse-url');
const parseBody = require('./parse-body');

//return a constructor that is going to be a new object for our route.//
//creating a router with a var to add things to this prototype //
const Router = module.exports = function(){

//going to rout a single property on this. Route is going to be an object. That object
//is goinng to have a property for GET, POST, PUT, DELETE//
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};


//router is an object constructor that register a single property called routes. That property has an pbject literal with empty objects - GET, POST, PUT, and DELETE//
Router.prototype.get = function(endpoint, callback){
  this.routes.GET['/api/note'] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST['/api/note'] = callback;
  return this;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT['api/note'] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE['api/note'] = callback;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;
  return function(req, res){
    Promise.all([
      parseBody(req),
      parseUrl(req)
    ]).then(function(){
      if(typeof routes[req.method][req.url.pathname] === 'function') {
        return routes[req.method][req.url.pathname](req, res);
      }
      fourOhFour('router-route', res);
    }).catch(function(err,res){
      console.log(err);
      fourOhFour(err,res);
    });
  };
};

function fourOhFour(err,res){
  res.writeHead(404, {
    'Content-Type': 'application/json'
  });

  res.write(JSON.stringify('not found' + err));
  res.end();
}
