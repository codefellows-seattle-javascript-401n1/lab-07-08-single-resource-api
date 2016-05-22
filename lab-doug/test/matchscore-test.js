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
});
