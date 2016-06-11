'use strict';
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req){
  return new Promise(function(resolve, reject){
    //converts full url to object
    req.url = parseUrl(req.url);
    console.log('show parse.url in parse-url.js:', req.url);
    //converts  the query section of url to an object
    req.url.query = parseQuery(req.url.query);
    console.log('show req.url.query in parse-url.js ', req.url.query);
    resolve();
  });
};
