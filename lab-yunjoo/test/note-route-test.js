'use strict';

const request = require('superagent');
// const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;

describe('testing note-route module', function(){
  before(function(done){
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
      server.isRunning = false;
      done();
    }
    return;
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
});
