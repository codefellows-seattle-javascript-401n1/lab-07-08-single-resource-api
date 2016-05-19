'use strict';

const Order = require('../model/order');
const response = require('../lib/response');

const orderPool = {};

module.exports = function(router) {
  router.post('/api/order', function (req,res) {
    if (req.body && req.body.item && req.body.qty){
      const order = new Order(req.body.item, req.body.qty);
      orderPool[order.id] = order;
      return response(200, order)(res);
    }

    response(400, 'bad request')(res);
  })
  .get('/api/order', function(req, res){
    const order = orderPool[req.url.query.id];

    if (!req.url.query.id) return response(400, 'bad request')(res);

    if (order){
      return response(200, order)(res);
    }
    response(404, 'not found')(res);
  })
  .put('/api/order', function(req, res){
    const order = orderPool[req.body.id];
    if (order) {
      order.qty = req.body.qty || order.qty;
      order.item = req.body.item || order.item;
      orderPool[order.id] = order;
      return response(200, order)(res);
    }
    response(404, 'not found')(res);
  })
  .delete('/api/order', function(req, res){
    const order = orderPool[req.body.id];
    if (order) {
      delete orderPool[order.id];
      return response(200, 'deleted')(res);
    }

    response(404, 'not found')(res);
  });

  router.get('/api/order/all', function (req, res) {

    const orders = Object.keys(orderPool).map((ordId) => {
      return orderPool[ordId];
    });

    response(200, orders)(res);
  });
};
