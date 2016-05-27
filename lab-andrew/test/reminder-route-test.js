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
    it('2should return a status 400', () => {
      expect(this.res.status).to.equal(400);
    });
  });
//
//
//
  describe('4 testing GET id method on endpoint /api/reminder', function() {
    before((done) => {
      request.post(`${serverUrl}/api/reminder`)
      .send({content: 'trolls'})
      .end((err, res) => {
        this.res = res;
        request.get(`${serverUrl}/api/reminder/?id=${this.reminder.id}`)
        .end((err, res) => {
          this.res = res;
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    it('4 should return a status 200', (done) => {
      console.log('ID: ', this.reminder.id);
      done();
    });
  });
//
//
//
//   describe('5 testing GET res for not found ID on endpoint /api/reminder', function() {
//     before((done) => {
//       request.get(`${serverUrl}/api/reminder`)
//       .end((err, res) => {
//         this.res = res;
//         expect(this.res.status).to.equal(404);
//         done();
//       });
//     });
//   });
//   it('should return a status 404 not found', () => {
//     expect(this.res.status).to.equal(400);
//   });
//
//   describe('6 testing POST method and completion on endpoint /api/reminder', function() {
//     before((done) => {
//       request.post(`${serverUrl}/api`)
//       .send({content: 'troll wat'})
//       .end((err, res) => {
//         this.res = res;
//         this.reminder.id = res.body.id;
//         done();
//       });
//     });
//     it('return a status 200 on creation of new reminder', (done) => {
//       newStorage.setItem('notes', {content: 'troll wat', remindMe: 'tomorrow'})
//         .then(function(reminder) {
//           expect(reminder.content).to.equal('troll wat');
//           expect(reminder.remindMe).to.equal('tomorrow');
//           done();
//         }).catch(function(err) {
//           console.error(err);
//           expect(err).to.equal(undefined);
//           done();
//         });
//     });
//   });
//
//   describe(' testing DELETE method on endpoint /api/reminder', function() {
//     before((done) => {
//       request.post(`${serverUrl}/api/reminder`).end((err, res) => {
//         this.res = res;
//         this.reminder.id = res.body.id;
//         request.delete(`${serverUrl}/api/reminder/delete`).send({id:res.body.id})
//         .end((err, res) => {
//           this.res = res;
//           this.model = res.body;
//           done();
//         });
//       });
//     });
//   });
//   it('7 should return status 200 of completed deletion', () => {
//     expect(this.res.status).to.equal(200);
//   });
//
});
