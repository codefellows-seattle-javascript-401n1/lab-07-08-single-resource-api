'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing note-route-post module', function(){
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
        done();
      });
      return;
    }
    done();
  });
//test POST
  describe('testing method:POST on endpoint /api/note', function(){
    before((done)=>{
      request
        .post(`${serverUrl}/api/note`)
        .send({content: 'test note !!!'})
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return statusCode 200', ()=>{
      expect(this.res.status).to.equal(200);
    });
    it('should return content: ', ()=>{
      expect(this.note.content).to.equal('test note !!!');
    });
  });

  describe('testing WRONG method:POST on endpoint', function(){
    before((done)=>{
      request
        .post(`${serverUrl}/api/note`)
        .send({})
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });
    it('should return statusCode 400', ()=>{
      expect(this.res.status).to.eql(400);
    });
  });


//test GET
  describe( 'testing @ /api/note GET method', function(){
    before((done) => {
      request
        .post(`${serverUrl}/api/note`)
        .send({content: 'test note !!!'})
        .end((err, res) => {
          request
          .get(`${serverUrl}/api/note?id=${res.body.id}`)
          .end((err, res) => {
            this.res = res;
            done();
          });
        });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
      expect(this.res.body.content).to.equal('test note !!!');
    });
  });

  describe('testing WRONG GET method', function(){
    before((done) => {
      request
        .post(`${serverUrl}/api/note`)
        .send({content: 'test note !!!'})
        .end((err, res) => {
          request.get(`${serverUrl}/api/note?id=${res.body.id,1234}`)
          .end((err, res) => {
            this.res = res;
            done();
          });
        });
    });

    it('should return status 404', ()=>{
      expect(this.res.status).to.equal(404);
    });
  });

  describe('test GET at /api/note/all', function(){
    before((done) => {
      request
      .post(`${serverUrl}/api/note`)
      .send({content:'test note 123'})
      .end(() => {
        request
        .get(`${serverUrl}/api/note/all`)
        .end((err, res) => {
          this.res = res;
          done();
        });
      });
    });
    it('should return 200', () => {
      expect(this.res.status).to.eql(200);
    });
  });

});
