'use strict';

const Order = require('../model/order');
const response = require('../lib/response');

const Storage = require('../lib/storage');
const storage = new Storage(`${__dirname}/../data`);

const orderPool = {};

module.exports = function(router) {
  router.post('/api/order', function (req,res) {
    const order = new Order(req.body.item, req.body.qty);

    if (!req.body || !req.body.item || !req.body.qty) {
      return response(400, 'bad request')(res);
    }

    storage.setOrder('order', order)
    .then(function(order) {
      return response(200, order)(res);
    }).catch (function () {
      return response(400, 'bad request')(res);
    });
  })
  .get('/api/order', function(req, res){
    if (!req.url.query.id) return response(400, 'bad request')(res);

    storage.fetchOrder('order', req.url.query.id)
    .then(function (order) {
      return response(200, order)(res);
    }).catch(function () {
      return response(404, 'not found')(res);
    });
  })
  .put('/api/order', function(req, res){
    console.log('putting', req.body);
    storage.fetchOrder('order', req.body.id)
    .then(function (order) {
      order.qty = req.body.qty || order.qty;
      order.item = req.body.item || order.item;
      storage.setOrder('order', order)
      .then(function (order) {
        return response(200, order)(res);
      });
    }).catch(function () {
      return response(404, 'not found')(res);

    });
  })
  .delete('/api/order', function(req, res){
    storage.removeOrder('order', req.body.id)
    .then(function () {
      response(200, 'deleted')(res);
    })
    .catch(function () {
      response(404, 'not found')(res);
    });
  });

  router.get('/api/order/all', function (req, res) {
    storage.listOrders('order').then(function (files) {
      files = files.filter((file) => {
        return file !== '.gitignore';
      });
      response(200, files)(res);
    });
  });
};
