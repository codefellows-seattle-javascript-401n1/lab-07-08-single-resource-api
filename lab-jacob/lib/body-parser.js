'use strict';

module.exports = function(req){
  return new Promise(function(resolve, reject){
    console.log('parser');
    if(/(PUT|POST|DELETE)/.test(req.method)){
      req.body = '';
      req.on('data', function(data){
        req.body += data.toString();
      });
      console.log('end of if');

      req.on('end', function(){
        try {
          console.log('heres try');
          req.body = JSON.parse(req.body);
          resolve(null);
        } catch(err){
          reject(err);
        }
      });
      return;
    }
    resolve(null);
  });
};
