'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = function(req){
  return new Promise(function(resolve){
    req.url = url.parse(req.url);
    req.query = querystring.parse(req.url.query);
    // console.log(req.query);
    resolve();
  });
};
