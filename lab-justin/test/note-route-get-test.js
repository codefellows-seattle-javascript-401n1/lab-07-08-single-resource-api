// 'use strict';
//
// const request = require('superagent');
// const expect = require('chai').expect;
//
// const port = process.env.PORT || 3000;
// const server = require('../server');
// const serverUrl = `http://localhost:${port}`;
//
// describe('testing note-route-two module', function(){
//
//   before(function(done) {
//     if(!server.isRunning){
//       server.listen(port, function(){
//         done();
//       });
//       return;
//     }
//     done();
//   });
//
//   after(function(done){
//     if (server.isRunning){
//       server.close(function(){
//         server.isRunning = false;
//         done();
//       });
//       return;
//     }
//     done();
//   });
//
//   describe( 'testing /api/note GET method', function(){
//     before((done) => {
//       request.post(`${serverUrl}/api/note`)
//         .send({content: 'test note !!!'})
//         .end((err, res) => {
//           request.get(`${serverUrl}/api/note?id=${res.body.id}`)
//           .end((err, res) => {
//             this.res = res;
//             done();
//           });
//         });
//     });
//
//     it('should return status 200', ()=>{
//       expect(this.res.status).to.equal(200);
//     });
//
//     it('should return a note', ()=>{
//       expect(this.res.body.content).to.equal('test note !!!');
//     });
//   });
// });
