'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing npc-route module', function(){
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
  describe('testing the POST method on endpoint api/npc', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/npc`)
        .send({name: 'testy Mctestface',
        race: 'testor',
        classes: 'test1, test2'
      }).end((err, res) =>{
        this.res = res;
        this.npc = res.body;
        done();
      });
    });

    it('should return status 200', ()=>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a npc', ()=>{
      expect(this.npc.name).to.equal('testy Mctestface');
    });
  });
  describe('testing the POST errors method on endpoint api/npc', function(){
    it('should return status 400', (done)=>{
      request.post(`${serverUrl}/api/npc`)
      .send('hello test')
      .end(function(err, res){
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('Bad request');
        done();
      });
    });
  });

  describe('testing the GET method on endpoint api/npc', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/npc`)
        .send({name: 'tes Mctestbutt',
        race: 'tester',
        classes: 'test3, test4'
      }).end((err, res) =>{
        this.res = res;
        this.npc = res.body;
        this.id = res.body.id;
        done();
      });
    });
    it('should return status 200', (done)=>{
      request.get(`${serverUrl}/api/npc?id=${this.id}`).end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('tes Mctestbutt');
        done();
      });
    });
    it('should return status 404', (done)=>{
      request.get(`${serverUrl}/api/npc?id=306d8120-1e3d-11e6-9de3-bd1343bd7852`).end(function(err, res){
        expect(res.status).to.equal(404);
        expect(res.body).to.equal('not found');
        done();
      });
    });
    it('should return status 400', (done)=>{
      request.get(`${serverUrl}/api/npc?`).end(function(err, res){
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('bad request');
        done();
      });
    });
  });
  describe('testing the DELETE method on endpoint api/npc', function(){
    before((done)=>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/npc`)
        .send({name: 'testel El\'testo',
        race: 'testina',
        classes: 'test1, tes54'
      }).end((err, res) =>{
        this.res = res;
        this.npc = res.body;
        this.id = res.body.id;
        console.log('DELETE before called and done@@@@');
        done();
      });
    });
    console.log('THIS.ID is', this.id);
    it('should return status 200', (done)=>{
      request.delete(`${serverUrl}/api/npc`)
      .send({id: `${this.id}`})
      .end((err, res)=>{
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Deleted');
        done();
      });
    });
  });
});
