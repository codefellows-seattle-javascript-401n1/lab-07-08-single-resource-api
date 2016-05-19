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
});
