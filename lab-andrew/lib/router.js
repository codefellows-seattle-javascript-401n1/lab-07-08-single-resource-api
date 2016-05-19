'use strict';

const parseUrl = require('url').parse;

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, cb) {
  this.routes.GET[endpoint] = cb;
  return this;
};
Router.prototype.get = function(endpoint, cb) {
  this.routes.GET[endpoint] = cb;
  return this;
};Router.prototype.put = function(endpoint, cb) {
  this.routes.PUT[endpoint] = cb;
  return this;
};Router.prototype.post = function(endpoint, cb) {
  this.routes.POST[endpoint] = cb;
  return this;
};Router.prototype.delete = function(endpoint, cb) {
  this.routes.DELETE[endpoint] = cb;
  return this;
};

Router.prototype.route = function() {
  const routes = this.routes;
  return function(req, res) {
    req.url = parseUrl(req.url);
    if(typeof routes[req.method][req.url.pathname] === 'function') {
      return routes[req.method][req.url.pathname](req, res);
    }
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    res.write('Note found');
    res.end();
  };
};
