'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;
const serverUrl = `http://localhost:${port}`;
const Storage = require('../lib/storage');
const newStorage = new Storage(`${__dirname}/../data`);

describe('Testing the model-route module', function(){
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

  describe(' 1 testing method POST on endpoint /api/model', function() {
    before((done) =>{
      console.log('serverUrl', serverUrl);
      request.post(`${serverUrl}/api/model/create`).send({name: 'Captain Underpants'}).end((err, res) => {
        this.res = res;
        this.model = res.body;
        done();
      });
    });

    it('should return status 200', () =>{
      expect(this.res.status).to.equal(200);
    });

    it('should return a model', () =>{
      expect(this.model.name).to.equal('Captain Underpants');
    });
  });
  describe(' 2 testing method POST for bad request on endpoint /api/model', function(){
    before((done)=>{
      request.post(`${serverUrl}/api/model/create`).end((err, res) => {
        this.res = res;
        this.model = res.body;
        done();
      });
    });

    it('should return status 400', () =>{
      expect(this.res.status).to.equal(400);
    });
  });
  describe(' 3 testing method GET on endpoint /api/model', function(){
    before((done)=>{
      request.get(`${serverUrl}/api/model/fetch?id=32343243`).end((err, res) => {
        this.res = res;
        this.model = res.body;
        done();
      });
    });
    it('should return status 404', () => {
      expect(this.res.status).to.equal(404);
    });
  });
  describe(' 4 testing method GET on endpoint /api/model', function(){
    before((done)=>{
      request.get(`${serverUrl}/api/model/fetch`).send({id: ''}).end((err, res)=> {
        this.res = res;
        this.model = res.body;
        done();
      });
    });
    it('should return status 400', () => {
      expect(this.res.status).to.equal(400);
    });
  });
  describe(' 5 testing method GET on endpoint /api/model', function(){
    before((done) =>{
      request.post(`${serverUrl}/api/model/create`).send({name: 'Captain Underpants'}).end((err, res) => {
        this.res = res;
        // this.res.id = res.id;
        request.get(`${serverUrl}/api/model/fetch?id=${res.body.id}`).end((err, res) => {
          this.res = res;
          done();
        });
      });
    });
    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
  });
  describe(' 6 testing method Storage on endpoint /api/model POST', function(){
    it('should return the model', function(done){
      newStorage.setItem('model', {id: 123456, name: 'test'}).then(function(model){
        expect(model.id).to.equal(123456);
        expect(model.name).to.equal('test');
        done();
      }).catch(function(err){
        console.error(err);
        expect(err).to.equal(undefined);
        done();
      });
    });
  });
  describe(' 7 testing DELETE request on endpoint api/model DELETE', function(){
    before((done) => {
      request.post(`${serverUrl}/api/model/create`).end((err, res) => {
        this.res = res;
        this.model = res.body;
        request.delete(`${serverUrl}/api/model/delete`).send({id: res.body.id}).end((err, res) => {
          this.res = res;
          this.model = res.body;
          done();
        });
      });
    });
    it('should return status 200', () => {
      expect(this.res.status).to.equal(200);
    });
  });
});
