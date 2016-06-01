'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const Storage = require('../lib/storage');
const dataDir = new Storage(`${__dirname}/../data`);

describe('test setItem', function(){
  it('write a file by ID', function(done){
    let item = {id:1234};
    dataDir.setItem('notes', item).then(function(data){
      expect(data).to.eql(item);
      expect(data.id).to.eql(1234);
      done();
    }).catch(function(err){
      expect(err).to.eql(undefined);
      done();
    });
    done();
  });
});

describe('test fetchItem', function(){
  it('should get the item', function(done){
    dataDir.fetchItem('notes', 1234).then(function(data){
      expect(data.id).to.eql(1234);
      done();
    }).catch(function(err){
      expect(err).to.eql(undefined);
      done();
    });
    done();
  });
});

describe('test deleteItem', function(){
  it('should return -1', function(done){
    dataDir.deleteItem('notes', 4321).then(function(){
      fs.readdir(`${__dirname}/../data/notes`, function(err, files){
        console.log('HIT', files);
        expect(files.indexof(4321)).to.eql(-1);
        done();
      }).catch(function(err){
        expect(err).to.eql(undefined);
        done();
      });
      done();
    });
  });
});
