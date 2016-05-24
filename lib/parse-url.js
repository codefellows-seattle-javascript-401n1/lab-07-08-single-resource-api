'use strict';

const url = require('url');
//requiring url built in node module
const queryString = require('querystring');
//requiring the built in node module querystring
module.exports = function(req){
  return new Promise(function(resolve){
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(url.query);
    resolve();
  });
};
