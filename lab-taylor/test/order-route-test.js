'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;

const serverUrl = `localhost:${port}`;

describe('testing order-route module', function(){
  before(function(done){
    if (!server.isRunning){
      server.listen(port, function(){
        done();
      });
      return;
    }
    done();
  });

  after(function (done) {
    if(server.isRunning){
      server.close(function () {
        server.isRunning = false;
        done();
      });
    }
  });

  describe('testing bad endpoints', function () {
    before((done) => {
      request.get(`${serverUrl}/order`)
      .end((err, res) => {
        this.res = res;
        done();
      });
    });

    it('should respond with a 404 status code', () => {
      expect(this.res.status).to.equal(404);
    });

  });

  describe('testing POST method on endpoint /api/order', function(){
    describe('with a good POST request', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({item: 'slugs', qty: 1000})
        .end((err, res) => {
          this.res = res;
          this.order = res.body;
          done();
        });
      });

      it('should return a 200', () => {
        expect(this.res.status).to.equal(200);
      });

      it('should return an order with an item, qty and id', () => {
        expect(this.order.item).to.equal('slugs');
        expect(this.order.qty).to.equal(1000);
        expect(this.order).to.have.property('id');
      });
    });

    describe('a bad POST request with an invalid body', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({})
        .end((err, res) => {
          this.res = res;
          this.order = res.body;
          done();
        });
      });

      it('should respond with a 400 status code', () => {
        expect(this.res.status).to.equal(400);
      });
    });

    describe('a bad POST request with no body', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send()
        .end((err, res) => {
          this.res = res;
          this.order = res.body;
          done();
        });
      });

      it('should respond with a 400 status code', () => {
        expect(this.res.status).to.equal(400);
      });
    });
  });

  describe('testing GET method on endpoint /api/order', function(){
    describe('a good GET request', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({item: 'slugs', qty: 1000})
        .end((err, res) => {
          request.get(`${serverUrl}/api/order?id=${res.body.id}`)
          .end((err, res) => {
            this.res = res;
            done();
          });
        });
      });

      it('should return 200 if order is found', () => {
        expect(this.res.status).to.equal(200);
      });
    });

    describe('a bad GET request without an ID query', function () {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({item: 'slugs', qty: 1000})
        .end(() => {
          request.get(`${serverUrl}/api/order`)
          .end((err, res) => {
            this.res = res;
            done();
          });
        });
      });

      it ('it should return with 400', () => {
        expect(this.res.status).to.equal(400);
      });
    });

    describe('a bad GET request with a bad ID query', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({item: 'slugs', qty: 1000})
        .end(() => {
          request.get(`${serverUrl}/api/order?id=9`)
          .end((err, res) => {
            this.res = res;
            done();
          });
        });
      });

      it ('it should return with a 404', () => {
        expect(this.res.status).to.equal(404);
      });
    });
  });

  describe('the /api/order/all endpoint', function(){
    describe('with a good POST request', function() {
      before((done) => {
        request.post(`${serverUrl}/api/order`)
        .send({item: 'slugs', qty: 1000})
        .end(() => {
          request.get(`${serverUrl}/api/order/all`)
          .end((err, res) => {
            this.res = res;
            this.orders = res.body;
            done();
          });
        });
      });

      it('should have a status of 200',() => {
        expect(this.res.status).to.equal(200);
      });

      it('should respond with an array', () => {
        expect(this.orders).to.be.an('array');
      });

      it('should have a length greater than 0', () => {
        expect(this.orders).to.have.length.above(0);
      });
    });
  });
});
