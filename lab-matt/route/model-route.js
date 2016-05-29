'use strict';

const Model = require('../model/model');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const newStorage = new Storage(`${__dirname}/../data`);


module.exports = function(router){
  router.post('/api/model/create', function(req, res){
    if (req.body) {
      try {
        req.body = JSON.parse(req.body);
      } catch(err) {
        response(400, 'bad request')(res);
        return;
      }
      const model = new Model(req.body.name);
      newStorage.setItem('model', model)
      .then(function(){
        return response(200, model)(res);
      }).catch(function(err){
        console.error('Error in api/model POST:', err);
        response(500, 'server error')(res);
      });
      return;
    }
    response(400, 'bad request')(res);

  }).get('/api/model/fetch', function(req, res){
    if(req && req.url && req.url.query && req.url.query.id) {
      newStorage.fetchItem('model', req.url.query.id)
      .then(function(model){
        response(200, model)(res);
      }).catch(() => {
        response(404, 'not found')(res);
      });
      return;
    }
    response(400, 'bad request')(res);
  }).delete('/api/model/delete', function(req, res){
    if(req.body){
      try{
        req.body = JSON.parse(req.body);
      } catch(err){
        response(400, 'bad request')(res);
        return;
      }
      console.log('deleting id', req.body.id);
      newStorage.deleteItem('model', req.body.id)
      .then(function(){
        response(200, 'success')(res);
      }).catch(() => {
        response(404, 'not found')(res);
      });
      return;
    }
    response(400, 'bad request')(res);

  });
};
