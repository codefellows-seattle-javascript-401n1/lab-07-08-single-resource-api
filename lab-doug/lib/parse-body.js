'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    if(/(POST|PUT|DELETE)/.test(req.method)){
      // console.log('req.body is entered');
      req.body = '';
      req.on('data', function(chunk){
        req.body += chunk.toString();
        // console.log('data chunk: ', chunk);
      });
      req.on('end', function(){
        try{
          console.log('enter req.body try1: ', req.body);
          req.body = JSON.parse(req.body);
          console.log('enter req.body try2: ', req.body);
          resolve(req.body);
        }catch(err){
          console.log('req.body catch called: ', err);
          reject(err);
        }
      });
      return;
    }
    resolve();
  });
};
