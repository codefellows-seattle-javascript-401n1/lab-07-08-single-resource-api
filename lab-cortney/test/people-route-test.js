'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require ( './../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing people-route module', function(){
  console.log(server.isRunning);
  before(function(){
    console.log('hello');
    if (!server.isRunning){
      server.listen(port, function(){
        console.log('Testing People Route Server Not Running');
        // done();
      });
      return;
    }
    console.log('Testing People Route Server Running');
    // done();
  });

  after(function(done){
    if (server.isRunning){
      server.close(function(){
        server.isRunning = false;
        console.log('Server Closing - After');
        done();
      });
      return;
    }
    console.log('Server is Being Closed - After');
    done();
  });

  describe('testing method POST on endpoint /api/people', function(){
    before((done) => {

      request.post(`${serverUrl}/api/people`)
        .send({name: 'testname!'})
        .end((err, res) => {
          this.res = res;
          this.person = res.body;
          done();
        });
    });

    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });

    it('should return a person', () => {
      expect(this.person.name).to.equal('testname!');
    });
  });

  it('should return status 400', function(done) {
    var url = `${serverUrl}/api/people`;
    request.post(url)
      .send({bad:'object'})
      .end(function(err, res) {
        expect(res.status).to.equal(400);
        done();
      });
  });

  describe('testing method GET on endpoint /api/people', function(){
    it('should return status 200', () => {
      request
        .get(serverUrl + '/api/people')
        .query('name=testname!')
        .end(function(err, res){
          expect(res.status).to.equal(200);
        });
    });

    it('should return status 404', () => {
      request
        .get(serverUrl + '/api/people')
        .query('name=doesNotExist')
        .end(function(err, res){
          expect(res.status).to.equal(404);
        });
    });

    it('should return status 400', function(){
      request
        .get(serverUrl + '/api/people')
        .query('name=')
        .end(function(err, res){
          expect(res.status).to.equal(400);
        });
    });
  });

  describe('testing method DELETE on endpoint /api/people', function(){
    it('should return status 200', () => {
      request
        .del(serverUrl + '/api/people?name=testname!')
        .end(function(err, res){
          expect(res.status).to.equal(200);
        });
    });

    // it('should return status 404', () => {
    //   request
    //     .del(serverUrl + '/api/people?name=doesNotExist')
    //     .end(function(err, res){
    //       expect(res.status).to.equal(404);
    //     });
    // });
  }); // end of delete test

}); // END OF PEOPLE-ROUTE-TEST MODULE
