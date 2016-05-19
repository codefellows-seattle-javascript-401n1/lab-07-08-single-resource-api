'use strict';

const bodyParser = require('./parse-body');
const urlParser = require('./parse-url');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
  return this;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
  return this;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
  return this;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
  return this;
};

Router.prototype.router = function (req, res) {
  const routes = this.routes;
  Promise.all([
    bodyParser(req),
    urlParser(req)
  ]).then(function () {
    if(typeof routes[req.method][req.url.pathname] === 'function'){
      return routes[req.method][req.url.pathname](req, res);
    }

    fourOhFour(res);
  }).catch(function (err) {
    console.error('error', err);
    fourOhFour(res);
  });
};
