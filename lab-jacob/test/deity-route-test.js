'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const PORT = process.env.PORT || 3000;
const serverUrl = `localhost:${PORT}`;

describe('testing the deity-note route', function(){
  before(function(done){ // runs this block before every it block, starts server
    if(!server.isRunning){
      server.listen(PORT, function(){
        done();
      });
      return;
    }
    done();
  });

  after(function(done){ // runs this block once after it block runs, stops server
    if(server.isRunning){
      server.close(function() {
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

  var testId; //global variable for storing posted UUID

  describe('testing post method on endpoint /api/deity', function(){ // beginning of tests for the post methods
    before((done) => {
      request.post(`${serverUrl}/api/deity`)
        .send({name: 'testyMcTestFace', power: 'testytests'})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          testId = res.body.id;
          done();
        });
    });

    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a deity name', () =>{
      expect(this.deity.name).to.equal('testyMcTestFace');
    });
  });

  describe('testing post method bad request', function() {
    before ((done) => {
      request.post(`${serverUrl}/api/deity`)
        .send({})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return a status 400', () => {
      expect(this.res.status).to.equal(400);
    });
    it('should return nothing', () => {
      expect(this.deity).to.equal('bad request');
    });
  });

  describe('testing a successful get method on endpoint /api/deity', function(){ // beginning of tests for the get method
    before((done) => {
      request.get(`${serverUrl}/api/deity`)
        .query({id: testId})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return a status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a deity name', () => {
      expect(this.deity.name).to.equal('testyMcTestFace');
    });
  });

  describe('testing get method not found', function(){
    before((done) => {
      request.get(`${serverUrl}/api/deity`)
        .query({id: 1234356456})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return a status 404', () => {
      expect(this.res.status).to.equal(404);
    });
    it('should return a not found in body', () => {
      expect(this.deity).to.equal('not found');
    });
  });

  describe('testing get method bad request', function(){
    before((done) => {
      request.get(`${serverUrl}/api/deity`)
        .query({})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return a status of 400', () => {
      expect(this.res.status).to.equal(400);
    });
    it('should return a bad request in body', () => {
      expect(this.deity).to.equal('bad request');
    });
  });

  describe('testing delete method on endpoint /api/deity', function(){ // test for the delete method
    before((done) => {
      request.del(`${serverUrl}/api/deity`)
        .query({id: testId})
        .end((err, res) => {
          //console.log('heres testing error');  long error message for debugging delete
          //if (err) console.log(err);
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return a status message of 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should delete the deity object', () => {
      expect(this.deity).to.equal();
    });
  });
});
