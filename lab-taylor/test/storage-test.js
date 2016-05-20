'use strict';

const Storage = require('../lib/storage');
const testStorage = new Storage(`${__dirname}/data`);
const expect = require('chai').expect;
const fs = require('fs');

describe('testing storage module', function () {
  describe('testing setOrder', function () {
    it('should return the item requested', function (done) {
      testStorage.setOrder('order', {id: 123456, item: 'reptar', qty: 3999})
      .then(function (order) {
        expect(order.id).to.equal(123456);
        expect(order.item).to.equal('reptar');
        expect(order.qty).to.equal(3999);
        done();
      })
      .catch(function (err) {
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('testing fetchOrder', function () {
    it('should return the item requested', function (done){
      testStorage.fetchOrder('order', 123456)
      .then(function(order){
        expect(order.id).to.equal(123456);
        expect(order.item).to.equal('reptar');
        expect(order.qty).to.equal(3999);
        done();
      })
      .catch(function (err) {
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('testing removeOrder', function () {
    it('should delete the item request', function(done){
      testStorage.removeOrder('order', 123456)
      .then(function() {
        fs.readdir(`${__dirname}/data/order`, function(err, files){
          expect(files.indexOf(123456)).to.equal(-1);
          done();
        });
      });
    });
  });
});
