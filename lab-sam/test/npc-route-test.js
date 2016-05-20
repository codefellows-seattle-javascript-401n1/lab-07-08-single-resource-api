'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing npc-route module', function(){
  var id = null;
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
        id = res.body.id
        done();
      });
    });
    it('should return status 200', (done)=>{
      request.get(`${serverUrl}/api/npc?id=${id}`).end(function(res, err){
        expect(this.res.status).to.equal(200);
        expect(this.npc.name).to.equal('tes Mctestbutt');
        done();
      });
    });
  });
});
