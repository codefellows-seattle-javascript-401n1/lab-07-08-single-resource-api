'use strict';

const debug = require('debug')('note:note-route-test');

//npm modules//
const request = require('superagent');
const expect = require('chai').expect;

//app modules//
const server = require('../server');

//env variable//
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;


//testing the server is functional - up an running//
describe('testing note-route module', function() {
  before(function(done) {
    if(!server.isRunning){
      server.listen(port, () => {
        done();
      });
      return;
    }
    done();
  });

  after((done) => {
    if (server.isRunning) {
      server.close(() => {
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

  describe('testing POST on /api/note', function() {
    debug('hitting POST api/note 200');
    before((done) => {
      request.post(`${serverUrl}/api/note`)
      .send({content: 'test note' })
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return a note', () => {
      expect(this.res.status).to.equal(200);
      expect(this.note.content).to.equal('test note');
    });

    it('should return a bad request', () => {
      request.post(`${serverUrl}/api/note/`)
      .end((res) => {
        expect(res.status).to.equal(400);
      });
    });
  });

  describe('testing GET on api/note', function () {
    debug('hitting GET api/note 404');
    before((done) => {
      request.post(`${serverUrl}/api/note`)
      .send({content: 'test note'})
      .end((err, res) => {
        this.res = res;
        request.get(`${serverUrl}/api/note/?id= 8675309`)
        .end((err, res) => {
          this.res = res;
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    it('should return a note', () => {
      expect(this.res.status).to.equal(404);
    });

    describe('testing GET on api/note', function () {
      debug('hitting GET api/note 400');
      before((done) => {
        request.post(`${serverUrl}/api/note`)
        .send({content: 'test note'})
        .end((err, res) => {
          this.res = res;
          request.get(`${serverUrl}/api/note`)
          .end((err, res) => {
            this.res = res;
            expect(res.status).to.equal(400);
            done();
          });
        });
      });

      it('should return not found', () => {
        expect(this.res.status).to.equal(400);
      });
    });
  });
});
