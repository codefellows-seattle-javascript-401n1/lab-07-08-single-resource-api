'use strict';

const Deity = require('../model/deity');
const response = require('../lib/response');
const Storage = require('../lib/storage');

const deityStorage = new Storage(`${__dirname}/../data`);
var valhalla = {};

module.exports = function(router){
  router
  .post('/api/deity', function(req, res){ // writes and stores a post request
    if(req.body.name && req.body.power){
      console.log('inside post');
      const deity = new Deity(req.body.name, req.body.power);
      valhalla[deity.id] = deity;
      deityStorage.createDeity('deity', deity)
      .then(function(deity){
        console.log('inside post.then');
        return response(200, deity)(res);
      }).catch(function(err) {
        console.log(err);
      });
    } else {response(400, 'bad request')(res);}
  })

  .get('/api/deity', function(req, res){ // writes and fetches a get request
    if(req.url && req.url.query && req.url.query.id){
      console.log('get method query id:', req.url.query.id);
      deityStorage.fetchDeity('deity', req.url.query.id)
      .then(function(deity){
        console.log('get method.then:');
        return response(200, deity)(res);
      }).catch((err) => {
        console.log(err);
        return response(404, 'not found')(res);
      });
    }else{
      console.log(req.url.query.id);
      response(400, 'bad request')(res);
    }
  })

  .delete('/api/deity', function(req, res){ // deletes data from data pool
    console.log('heres delete');
    if(req.body) {
      const deity = req.body.id;
      console.log('inside delete if');
      delete valhalla[deity];
      deityStorage.deleteDeity('deity', deity)
      .then(function(){
        return response(200, 'success')(res);
      }).catch(function(err){
        console.log(err);
      });
    } else {response(404, 'nothing here')(res);}
  });
};
