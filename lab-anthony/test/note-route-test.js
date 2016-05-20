'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('./../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

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
    if (server.isRunning) {
      server.close(function(){
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

  describe('testing method POST on endpoint /api/note', function(){
    before((done)=> {
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
        .send({content: 'This is a test note!'})
        .end((err,res)=>{
          this.res = res;
          this.note = res.body;
          done();
        });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a note', ()=>{
      expect(this.note.content).to.equal('This is a test note!');
    });
  });

  describe('testing method GET on endpoint /api/note', function(){
    describe('testing positive GET req', function() {
      before((done)=> {
        console.log('serverUrl', serverUrl);
        request.post(`${serverUrl}/api/note`)
          .send({content: 'This is a test note!'})
          .end((err,res)=>{
            request.get(`${serverUrl}/api/note?id=${res.body.id}`)
            .end((err, res)=>{
              this.res = res;
              done();
            });
          });
      });
      it('should return status 200', ()=>{
        expect(this.res.status).to.equal(200);
      });
    });
  });
//more testing for other routes
});
