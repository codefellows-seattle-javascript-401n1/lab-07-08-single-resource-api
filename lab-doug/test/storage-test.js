'use strict';
const fs = require('fs');
const expect = require('chai').expect;
const Storage = require('../lib/storage');
const testStorage = new Storage(`${__dirname}/data`);

describe('Testing the Storage module,', function(){
  describe('Testing the setItem method,', function(){
    it('should match file name equal to uuid.json', function(done){
      var item = {uuid:'123456', distance: 500, score: 576, xCount: 25};
      testStorage.setItem('matchscore',item )
      .then (() => {
        fs.readdir(`${__dirname}/data/matchscore`, function(err, files){
          done();
        })
      .then(function(files){
        expect(files.name).to.equal('123456.json');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
      });
    });
  });
  describe('Testing the fetchItem method,', function(){
    it('should return the existing item and verify correct uuid and correct score values: ', function(done){
      testStorage.fetchItem('matchscore', '123456').
      then(function(item){
        expect(item.uuid).to.equal('123456');
        expect(item.score).to.equal(576);
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
  describe('Testing the deleteItem method,', function(){
    it('should verify that the file does not exist: ', function(done){
      testStorage.deleteItem('matchscore', '123456')
      .then (() => {
        fs.readdir(`${__dirname}/data/matchscore`, function(err, files){
          expect(files).to.not.include.members(['123456.json']);
          done();
        });
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
});
