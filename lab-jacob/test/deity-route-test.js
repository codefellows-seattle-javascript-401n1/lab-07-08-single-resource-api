'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const PORT = process.env.PORT || 3000;
const serverUrl = `localhost:${PORT}`;

describe('testing the deity-note route', function(){
  before(function(done){ // runs this block before every it block, starts server
    if(!server.isRunning){
      server.listen(PORT, function(){
        done();
      });
      return;
    }
    done();
  });

  after(function(done){ // runs this block once after it block runs, stops server
    if(server.isRunning){
      server.close(function() {
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

  describe('testing method post on endpoint /api/deity', function(){
    before((done) => {
      request.post(`${serverUrl}/api/deity`)
        .send({name: 'testyMcTestFace'})
        .end((err, res) => {
          this.res = res;
          this.deity = res.body;
          done();
        });
    });

    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
    it('should return a a deity name', () =>{
      expect(this.deity.name).to.equal('testyMcTestFace');
    });
  });
});
