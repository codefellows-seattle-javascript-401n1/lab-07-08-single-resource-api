'use strict';

const expect = require('chai').expect;
const Storage = require('../lib/storage');
const testStorage = new Storage(`${__dirname}/data`);
const fs = require('fs');

describe('testing storage module', function(){
  describe('testing setItem', function(){
    it('should return the item', function(done){
      testStorage.setItem('note', {'id': '123456', 'content':'test test test!'})
      .then(function(item){
        expect(item.id).to.equal((123456).toString());
        expect(item.content).to.equal('test test test!');
        done();
      }).catch(function(err){
        console.error(err);
        done(err);
      });
    });
  });
  describe('testing fetchItem', function(){
    it('should response ', function(done){
      testStorage.fetchItem('note', 123456)
      .then(function(note){
        expect(note.id).to.equal('123456');
        expect(note.content).to.equal('test test test!');
        done();
      }).catch(function(err){
        console.error(err);
        done(err);
      });
    });
  });
  describe('testing deleteItem', function(){
    it('should delete the item and return -1', function(done){
      testStorage.deleteItem('note',123456)
      .then(function(){
        fs.readdir(`${__dirname}/data/note`,function(err, files){
          expect(files.indexOf('123456')).to.equal(-1);
          done();
        });
      })
      .catch(done);
    });
  });
});
