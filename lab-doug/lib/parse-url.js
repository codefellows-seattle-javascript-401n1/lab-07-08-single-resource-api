'use strict';
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req){
  return new Promise(function(resolve, reject){
    req.url = parseUrl(req.url);
    req.url.query = parseQuery(req.url.query);
    resolve();
  });
};
