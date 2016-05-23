'use strict';

const expect = require('chai').expect;
const Storage = require('../lib/storage');
const dataDir = __dirname + '/testdata';
const testStoreage = new Storage(dataDir);

describe('testing storage module', function(){
  describe('testing setItem', function(){
    it('should return the item', function(done){
      testStoreage.setItem('data', {id: 123456, content: 'test test test'})
      .then(function(item){
        expect(item.id).to.equal(123456);
        expect(item.content).to.equal('test test test');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
});
//testing fetch
describe('testing storage module', function(){
  describe('testing fetchItem', function(){
    it('should return the item', function(done){
      var id = 123456;
      testStoreage.fetchItem('data', id)
      .then(function(item){
        expect(item.id).to.equal(123456);
        expect(item.content).to.equal('test test test');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
});
