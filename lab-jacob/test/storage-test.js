'use strict';

const expect = require('chai').expect;
const Storage = require('../lib/storage');
const storageDirectory = new Storage(`${__dirname}/data`);

describe('testing the storage module', function(){
  describe('creating a new resource with createDeity', function() {
    it('should return an item placed in data directory', function(done){
      storageDirectory.createDeity('deity', {id: 123345, name: 'loki', power: 'shapeshifting'})
      .then(function(deity){
        expect(deity.id).to.equal(123345);
        expect(deity.name).to.equal('loki');
        expect(deity.power).to.equal('shapeshifting');
        done();
      }).catch(function(err){
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('fetching a resource with fetch Deity', function() {
    it('should return an item from storage', function(done){
      storageDirectory.fetchDeity('deity',  123345)
      .then(function(deity){
        console.log(deity.name, deity.power, deity.id);
        expect(deity.id).to.equal(123345);
        done();
      }).catch(function(err){
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('deleting a resource with delete deity', function() {
    it('should delete a deity from storage', function(done){
      storageDirectory.deleteDeity('deity', {id: 123345})
      .then(function(deity){
        expect(deity).to.equal(null);
        done();
      }).catch(function(err){
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
});
