
'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;


//testing the server is functional - up an running. environment is set up//
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
    if (server.isRunning){
      server.close(function(){
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

//testing method POST//
  describe('testing method POST on endpoint /api/note', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
       .send({content: 'test note !!!'})
       .end((err, res) => {
         this.res = res;
         this.note = res.body;
         done();
       });
    });

    it('should return status 200', ()=>{
      request;
      expect(this.res.status).to.equal(200);
    });

    it('should return a note', ()=>{
      expect(this.note.content).to.equal('test note !!!');
    });
  });

});

  describe('testing method POST with no body', function(){
    before((done)=>{
      console.log(`${serverUrl}/api/note`, function(){
      request.post
      .send({content:""})
      .end((err, res) =>{
        this.res = res.
        this.note = res.body;
        done();
      });
    });

      it('should return a status 400', ()=>{
        request;
        expect(this.res.status).to.equal(400);
      });

      it('should return \"bad request\"', ()=>{
        expect(this.res.text).to.equal('bad request');
      });
    });
    
