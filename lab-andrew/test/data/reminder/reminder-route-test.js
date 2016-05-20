'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;


describe('Testing reminder route module', function() {
  before(function(done) {
    if(!server.isRunning) {
      server.listen(port, function() {
        done();
      });
      return;
    }
    done();
  });
  after(function(done) {
    if (server.isRunning) {
      server.close(function() {
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });
  describe('testing POST method on endpoint /api/reminder', function() {
    before((done) => {
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'Troll talk'})
      .end((err, res) => {
        this.res = res;
        this.reminder = res.body;
        done();
      });
    });
    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a reminder', () => {
      expect(this.reminder.content).to.equal('test trolls');
    });
  });
});
