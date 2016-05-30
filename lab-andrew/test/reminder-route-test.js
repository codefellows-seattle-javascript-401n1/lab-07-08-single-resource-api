'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

// const Server = require('../lib/storage');
// const newStorage = new Server(`${__dirname}/../data/notes`);


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


  describe(' testing POST method on endpoint /api/reminder', function() {
    before((done) => {
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'Troll talk', remindMe: 'tomorrow'})
      .end((err, res) => {
        this.res = res;
        this.reminder = res.body;
        done();
      });
    });
    it('1 should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a reminder', () => {
      expect(this.reminder.content).to.equal('Troll talk');
    });
  });


  describe(' testing invalid POST fail on endpoint /api/reminder', function() {
    before((done) => {
      request.post(`${serverUrl}/api/reminder`)
      .send({})
      .end((err, res) => {
        this.res = res;
        this.reminder = res.body;
        done();
      });
    });
    it('2 should return a status 400', () => {
      expect(this.res.status).to.equal(400);
    });
  });

  describe('3 testing for bad route', function() {
    it('3 should return status 404', function(done) {
      request.get(`${serverUrl}/bad route`)
      .end((req, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  });



  describe('4 testing GET id method on endpoint /api/reminder', function() {
    before((done) => {
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'trolls'})
      .end((err, res) => {
        this.res = res;
        request.get(`${serverUrl}/api/reminder?id=${res.body.id}`)
        .end((err, res) => {
          this.res = res;
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    it('4 should return a status 200', (done) => {
      console.log('ID: ', this.reminder);
      done();
    });
  });
//
//
//
  describe('5 testing GET res for not found ID on endpoint /api/reminder', function() {
    before((done) => {
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'trolls'})
      .end((err, res) => {
        this.res = res;
        request.get(`${serverUrl}/api/reminder?id=12345`)
        .end((err, res) => {
          this.res = res;
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    it('5 should return a status 404', (done) => {
      console.log('ID: ', this.reminder);
      done();
    });
  });

  describe('6 testing GET method on endpoint /api/reminder', function() {

    before((done) => {
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'trolls'})
      .end((err, res) => {
        this.res = res;
        request.get(`${serverUrl}/api/reminder`)
        .end((err, res) => {
          this.res = res;
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    it('6 should return a status 400', (done) => {
      console.log('ID: ', this.reminder);
      done();
    });
  });
});
