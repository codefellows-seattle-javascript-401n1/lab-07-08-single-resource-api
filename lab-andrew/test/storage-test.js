
'use strict';

const Storage = require('../lib/storage');
const testStorage = new Storage(`${__dirname}/data`);
const expect = require('chai').expect;
const fs = require('fs');

describe('testing storage module', function () {
  describe('testing setItem', function () {
    it('should return the item requested', function (done) {
      testStorage.setItem('reminder', {id: 123456, content: 'trolls', remindMe: 'tomorrow'})
      .then(function (reminder) {
        expect(reminder.id).to.equal(123456);
        expect(reminder.content).to.equal('trolls');
        expect(reminder.remindMe).to.equal('tomorrow');
        done();
      })
      .catch(function (err) {
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('testing fetchItem', function () {
    it('should return the item requested', function (done){
      testStorage.fetchItem('reminder', 123456)
      .then(function(reminder){
        expect(reminder.id).to.equal(123456);
        expect(reminder.content).to.equal('trolls');
        expect(reminder.remindMe).to.equal('tomorrow');
        done();
      })
      .catch(function (err) {
        console.log(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });

  describe('testing deleteItem', function () {
    it('should delete the item request', function(done){
      testStorage.deleteItem('reminder', 123456)
      .then(function() {
        fs.readdir(`${__dirname}/data/reminder`, function(err, files){
          expect(files.indexOf(123456)).to.equal(-1);
          done();
        }).catch(function (err) {
          console.log(err);
          expect(err).to.equal(undefined);
          done();
        });
      });
    });
  });
});
