'use strict';

const parseUrl = require('./parse-url');
const parseBody = require('./parse-body');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, cb){
  this.routes.GET[endpoint] = cb;
  return this;
};
Router.prototype.post = function(endpoint, cb){
  this.routes.POST[endpoint] = cb;
  return this;
};
Router.prototype.delete = function(endpoint, cb){
  this.routes.DELETE[endpoint] = cb;
  return this;
};

Router.prototype.route = function(){
  const routes = this.routes;
  return function(req, res){
    Promise.all([
      parseUrl(req),
      parseBody(req)
    ]).then(function(){
      if(typeof routes[req.method][req.url.pathname] === 'function'){
        return routes[req.method][req.url.pathname](req, res);
      }
      fourHunderd(res);
    }).catch(function(err){
      console.log('route method', err);
      fourHunderd(res);
    });
  };
};

function fourHunderd(res){
  console.log('called 404');
  res.writeHead(400, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify('Bad request'));
  res.end();
}
