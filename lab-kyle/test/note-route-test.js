'use strict';

const request = require('superagent');
const fs = require('fs');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;


describe('testing note-route module', function(){
  before(function(done) {
    if(!server.isRunning){
      server.listen(port, function(){
        done();
      });
      return;
    }
    done();
  });

  after(function(done){
    if (server.isRunning){
      server.close(function(){
        server.isRunning = false;
        console.log('server shut down');
        done();
      });
      return;
    }
    done();
  });
//post testing
  describe('testing method POST on endpoint /api/note', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
        .send({content: 'hello'})
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a note', ()=>{
      expect(this.note.content.content).to.equal('hello');
    });
  });

  describe('testing method POST with no body provided', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
        .send({wat: ''})
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return status 400', ()=>{
      expect(this.res.status).to.equal(400);
    });

    it('should return \"bad request\"', ()=>{
      expect(this.res.text).to.equal('\"bad request\"');
    });
  });
//get testing
  describe('testing method GET on endpoint api/note with bad id', function(){
    before((done)=>{
      var id = '98765';
      console.log('serverUrl', serverUrl);
      request.get(`${serverUrl}` + '/api/note/?id==', id)
        .send()
        .end((err, res) => {
          this.res = res;
          this.note = res.text;
          done();
        });
    });

    it('should return status 404', ()=>{
      expect(this.res.status).to.equal(404);
    });

    it('should return \"not found\"', ()=>{
      expect(this.res.text).to.equal('\"not found\"');
    });
  });

  describe('testing method GET on endpoint api/note with bad parameter', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.get(`${serverUrl}/api/note`)
        .end((err, res) => {
          this.res = res;
          this.note = res.text;
          done();
        });
    });

    it('should return status 400', ()=>{
      expect(this.res.status).to.equal(400);
    });

    it('should return \"bad request\"', ()=>{
      expect(this.res.text).to.equal('\"bad request\"');
    });
  });

  describe('testing method GET on endpoint /api/note/?id=123456', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      const url = `${serverUrl}/api/note`;
      request.get(url)
        .query('id=123456')
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a note', ()=>{
      expect(this.note).to.equal('123456');
    });
  });
// delete test
  describe('testing method DELETE on endpoint /api/note', function(){
    before((done)=>{
      fs.writeFile('/Users/Semtex/Desktop/codefellows/lab-07-08-single-resource-api/lab-kyle/routes/data/notes/23456', '{\"id\": \"23456\"}', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
      });
      console.log('serverUrl', serverUrl);
      request.del(`${serverUrl}/api/note`)
        .send({id: '23456'})
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a message of \"note deleted\"', ()=>{
      expect(this.res.text).to.equal('\"note deleted\"');
    });
  });
});
