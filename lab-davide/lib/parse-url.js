'use strict';

const url = require('url');
const queryString = require('querystring');

//A reject is not needed with this promise will never fail//
module.exports = function(req){
  return new Promise(function(resolve){
    req.url = url.parse(req.url);
    url.query = queryString.parse(req.url.query);
    resolve();
  });

};
