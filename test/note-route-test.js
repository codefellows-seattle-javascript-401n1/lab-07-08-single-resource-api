'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;
const serverUrlGet = `http get localhost:${port}`;

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
    if(server.isRunning){
      server.close(function(){
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });
  describe('testing method GET error on endpoint /api/note', function(){
    before((done) =>{
      const testId = {id:123};
      console.log('serverUrlGet', serverUrlGet);
      request.get(`${serverUrlGet}/api/note?id=${testId}`)
        .end((err,res) =>{
          this.res =res;
          this.note = res.body;
          done();
        });
    });
    it('should return status 404', ()=>{
      expect(this.res.status).to.equal(404);
    });
    it('should return an error', ()=>{
      expect(this.note.content).to.equal('not found');
    });
  });
  describe('testing method POST on endpoint /api/note', function(){
    before((done) =>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
        .send({content: 'test note!'})
        .end((err, res) =>{
          this.res = res;
          this.note = res.body;
          done();
        });
    });
    it ('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });
    it ('should return a note', ()=>{
      expect(this.note.content).to.equal('test note!');
    });
  });

});
