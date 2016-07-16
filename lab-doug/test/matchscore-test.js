'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing matchscore module ', function(){
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
  describe('Testing  POST method on endpoint /api/matchscore', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        done();
      });
    });

    it('should set statusCode 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should map JSON for matchScore object', () => {
      expect(this.matchScore.distance).to.equal(600);
    });
  });
  describe('Testing  POST method on endpoint /api/matchscore', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send()
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        //letting the before block know that it is complete.
        //the program now goes on to execute the 'it' blocks
        done();
      });
    });

    it('should set statusCode 400: ', () => {
      expect(this.res.status).to.equal(400);
    });
    it('should return bad request response', () => {
      expect(this.matchScore).to.equal('bad request');
    });
  });

  describe('Testing  GET success on endpoint /api/matchscore', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 22})
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        request.get(`${serverUrl}/api/matchscore`)
        .query(`id=${this.matchScore.uuid}`)
          .end((err, res) => {
            this.getRes = res;
            this.getResBody = res.body;
            done();
          });
      });
    });
    it('should set a response code of 200 to prove GET is working', () => {
      expect(this.getRes.status).to.equal(200);
    });
  });

  describe('Testing  failed GET method with invalid uuid: ', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        request.get(`${serverUrl}/api/matchscore`)
        .query('id=0001')//invalid uuid
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
  describe('Testing  failed GET method with NO uuid: ', function(){
    before((done) => {
      request.post(`${serverUrl}/api/matchscore`)
      .send({distance: 600, score: 588, xCount: 15 })
      .end((err, res) => {
        this.res = res;
        this.matchScore = res.body;
        request.get(`${serverUrl}/api/matchscore`)
        .query('')//invalid uuid
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
