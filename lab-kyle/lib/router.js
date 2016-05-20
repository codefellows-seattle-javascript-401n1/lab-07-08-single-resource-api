'use strict';
const parseUrl = require('./parse-url');
const parseBody = require('./parse-body');

const Router = module.exports = function(){
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
    console.log('got it');
    Promise.all([
      parseBody(req),
      console.log('got it 3'),
      parseUrl(req),//getting stuck right here
      console.log('got it 4')
    ]).then(function(){
      console.log('got it 2');
      if(typeof routes[req.method][req.url.pathname] === 'function'){
        return routes[req.method][req.url.pathname](req, res);
      }
      fourOhFour(res);
    }).catch(function(err){
      console.log('got it 5');
      fourOhFour(res);
    });
  };
};

function fourOhFour(res){
  res.writeHead(404, {
    'Content-Type': 'application/json'
  });

  res.write(JSON.stringify('not found'));
  res.end();
}
