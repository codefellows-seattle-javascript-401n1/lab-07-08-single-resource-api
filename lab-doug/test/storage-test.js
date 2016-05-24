'use strict';
const expect = require('chai').expect;
const Storage = require('../lib/storage');
const testStorage = new Storage(`${__dirname}/data`);

describe('Testing the Storage module,', function(){
  describe('Testing the setItem method,', function(){
    it('should return the item', function(done){
      testStorage.setItem('matchscore', {uuid:123456, distance: 500, score: 576, xCount: 25}).

    then(function(item){
      expect(item.uuid).to.equal(123456);
      expect(item.score).to.equal(576);
      done();
    }).catch(function(err){
      console.error(err);
      expect(err).to.equal(undefined);
      done();
    });
    });
  });
  describe('Testing the fetchItem method,', function(){
    it('should return the existing item and verify correct uuid and correct score values: ', function(done){
      testStorage.fetchItem('matchscore', 123456).
      then(function(item){
        expect(item.uuid).to.equal(123456);
        expect(item.score).to.equal(576);
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });


});
