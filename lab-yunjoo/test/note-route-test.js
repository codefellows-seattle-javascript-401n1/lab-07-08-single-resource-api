'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('./../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing note-route module', function(){
  before(function(done){
    if(!server.isRunning){
      server.listen(port, function(){
        server.isRunning = true;
        done();
      });
      return;
    }
    done();
  });
  after(function(done){
    if(server.isRunning){
      return server.close(() => {
        server.isRunning = false;
        done();
      });
    }
    return done();
  });


  describe('tesing bad POST request on endpoint /api/note', function(){
    it('should return not found status 404 code',(done)=>{
      request.post(`${serverUrl}/api/n`)
        .send({content:'meh~'})
        .end((err,res) =>{
          this.res = res;
          this.note = res.body;
          expect(this.res.status).to.equal(404);
          done();
        });
    });
    it('should return bad request 400',(done) =>{
      request.post(`${serverUrl}/api/note`)
        .send({})
        .end((err,res) =>{
          this.res = res;
          this.note = res.body;
          expect(this.res.status).to.equal(400);
          done();
        });
    });

  });


  describe('testing method POST on endpoint /api/note', function(){
    before((done) =>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/note`)
      .send({content:'test note!!!'})
      .end((err,res) =>{
        this.res = res;
        this.note = res.body;
        done();
      });
    });
    describe('testing POST content', ()=>{
      it('should return content "test note!!!"', ()=> {
        expect(this.note.content).to.equal('test note!!!');
      });
    });
    describe('tesing POST response status code', ()=>{
      it('should return 200', ()=>{
        expect(this.res.status).to.equal(200);
      });
    });

  });



  describe('testing GET method on endpoint /api/note', function(){
    before((done) =>{
      request.post(`${serverUrl}/api/note`)
      .send({id:'1234', content:'testing GET!!!'})
      .end((err, res) =>{
        request.get(`${serverUrl}/api/note?id=${res.body.id}`)
        .end((err, res) => {
          this.res = res;
          this.note = res.body;
          done();
        });
      });
    });
    describe('testing GET content',()=>{
      it('should return testing GET!!!',()=>{
        expect(this.note.content).to.equal('testing GET!!!');
      });
    });
    describe('testing GET method status 200',()=>{
      it('should return 200 status code', ()=>{
        expect(this.res.status).to.equal(200);
      });
    });
  });

  describe('testing GET method ERROR on endpoint /api/note', function(){
    it('should return 400',(done)=>{
      request.post(`${serverUrl}/api/note`)
       .send({content:'testing GET!!!'})
       .end((err) =>{
         expect(err).to.equal(null);
         request.get(`${serverUrl}/api/note`)
         .end((err, res) => {
           this.res = res;
           expect(this.res.status).to.equal(400);
           done();
         });
       });
    });
    it('should return 404',(done)=>{
      request.post(`${serverUrl}/api/note`)
       .send({content:'testing GET!!!'})
       .end((err,res) =>{
         request.get(`${serverUrl}/api/note?id=${res.body.id+1}`)
         .end((err, res) => {
           this.res = res;
           expect(this.res.status).to.equal(404);
           done();
         });
       });
    });
  });
});
