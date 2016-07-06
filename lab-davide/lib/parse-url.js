'use strict';

//assigning const url to a built in required node module//
const url = require('url');
const queryString = require('querystring');

//reject is not needed with this promise will never fail//
module.exports = function(req){
  return new Promise(function(resolve){
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    resolve();
  });

};
