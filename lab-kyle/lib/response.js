'use strict';

module.exports = function(statusCode, data){
  return function(res){
    res.writeHead(statusCode, {
      'Content-Type': 'appliction/json'
    });
    res.write(JSON.stringify(data), function(err) {
      console.log(err);
      res.end();
    });
  };
};
