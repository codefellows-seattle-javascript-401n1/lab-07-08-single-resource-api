'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    if (/(POST|PUT|DELETE)/.test(req.method)){
      req.body = '';
      req.on('data', function(data){
        req.body += data.toString();
      });

      req.on('end', function(){
        try {
          req.body = JSON.parse(req.body);
          resolve('did the thing');
        } catch(err){
          reject('did NOT do the thing because:', err);
        }
      });
      return;
    }
    resolve();
  });
};
