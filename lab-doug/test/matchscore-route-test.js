'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing matchscore-route module ', function(){
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
    if(server.isRunning){
      server.close(function(){
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });
  //write a test to ensure that your api returns a status code of 404 for routes that have not been registered

  describe('Testing  POST route failure on endpoint /api/matchscore', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscor`)//removed letter 'e'
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        done();
      });
    });

    it('should set statusCode 404', () => {
      expect(this.res.status).to.equal(404);
    });
    it('should provide json string response of "not found": ', () => {
      expect(this.matchScore).to.equal('not found');
    });
  });


  describe('Testing  failed GET method on endpoint /api/matchscore: ', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        request.get(`${serverUrl}/api/matchscore`)
        .query('id=0099888')//invalid uuid
          .end((err, res) => {
            this.getRes = res;
            this.getResBody = res.body;
            done();
          });
      });
    });
    it('should return a response code of 404', () => {
      expect(this.getRes.status).to.equal(404);
    });
    it('should provide json string res of "not found"', () => {
      expect(this.getResBody).to.equal('not found');
    });
  });
  describe('Testing  failed GET method on endpoint /api/matchscore: ', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        request.get(`${serverUrl}/api/matchscore`)
        .query('id=')//no id
          .end((err, res) => {
            this.getRes = res;
            this.getResBody = res.body;
            done();
          });
      });
    });
    it('should return a response code of 400', () => {
      expect(this.getRes.status).to.equal(400);
    });
    it('should provide json string res of "bad request"', () => {
      expect(this.getResBody).to.equal('bad request');
    });
  });



});
