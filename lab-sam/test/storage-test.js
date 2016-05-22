'use strict';


const expect = require('chai').expect;
const Storage = require('../lib/storage');
const testStorage = new Storage('/home/sam/401/lab-07-08-single-resource-api/lab-sam/test/data');

describe('testing storage module', function(){
  describe('testing setNpc', function(){
    it('should return the NPC', function(done){
      testStorage.setNpc('npc', {id:1234567, name: 'testy Mctest-test',
      race: 'tester',
      classes: 'test3, test4'
    })
      .then(function(npc){
        expect(npc.name).to.equal('testy Mctest-test');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
  describe('testing fetchNpc', function(){
    it('should return the NPC', function(done){
      testStorage.fetchNpc('npc', 1234567)
      .then(function(npc){
        expect(npc.name).to.equal('testy Mctest-test');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
});
