'use strict';

const expect = require('chai').expect;
const fs = require('fs');

const Storage = require('../lib/storage');
const dataDir = new Storage(`${__dirname}/../data`);

describe('Testing the storage module', function() {
  describe('Testing successful setItem function', function(){
    it('should write a new file by item id ', function(done){
      const item = {id:8888};
      dataDir.setItem('notes', item).then(function(data){
        expect(data).to.be.equal(item);
        expect(data.id).to.be.equal(8888);
        done();
      }).catch(function(err){
        console.log(err);
        expect(err).to.be.equal(undefined);
        done();
      });
    });
  });
});

describe('Testing the storage module', function(){
  describe('Testing successful fetchItem function', function(){
    it('should return the requested item', function(done){
      dataDir.fetchItem('notes', 8888).then(function(data){
        expect(data.id).to.be.equal(8888);
        done();
      }).catch(function(err){
        console.log(err);
        expect(err).to.be.equal(undefined);
        done();
      });
    });
  });
});

describe('Testing the storage module', function(){
  describe('Testing successful deleteItem function', function(){
    it('should result in -1', function(done){
      dataDir.deleteItem('notes', 8888).then(function(){
        fs.readdir(`${__dirname}/../data/notes`, function(err, files){
          expect(files.indexOf(8888)).to.be.equal(-1);
          done();
        }).catch(function(err){
          console.log(err);
          expect(err).to.be.equal(undefined);
          done();
        });
      });
    });
  });
});
