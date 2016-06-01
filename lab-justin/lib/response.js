'use strict';
//fx currying
module.exports = function(statusCode, data){
  return function(res){
    res.writeHead(statusCode, {
      'Content-Type': 'appliction/json'});
    res.write(JSON.stringify(data));
    res.end();
  };
};
