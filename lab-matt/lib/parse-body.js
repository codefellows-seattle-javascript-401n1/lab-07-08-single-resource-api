'use strict';

module.exports = function(req){
  return new Promise(function(resolve){
    if(/(POST|PUT|DELETE)/.test(req.method)){
      req.body = '';
      req.on('data', function(data){
        req.body += data.toString();
      });
      req.on('end', function(){
        resolve();
      });
      return;
    }
    resolve();
  });
};
