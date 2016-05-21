'use strict';
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req){
  return new Promise(function(resolve, reject){
    req.url = parseUrl(req.url);
    console.log('req.url: ', req.url);
    req.url.query = parseQuery(req.url.query);
    console.log('req.url.query: ', req.url.query);
    resolve();
  });
};
