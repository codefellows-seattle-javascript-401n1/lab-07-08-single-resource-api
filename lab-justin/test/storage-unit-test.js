// 'use strict';
//
// const expect = require('chai').expect;
// const Storage = require('../lib/storage');
// const testStoreage = new Storage(`${__dirname}/data`);
//
// describe('testing storage-unit module', function(){
//   describe('testing setItem', function(){
//     //
//     // after((done)=> {
//     //   delete testStoreage.item.id;
//     //   delete testStoreage.item.content;
//     //   done();
//     // });
//     //
//     it('should return the item', function(done){
//       testStoreage.setItem('note', {id: 123456, content: 'test test test'})
//       .then(function(item){
//         expect(item.id).to.equal(123456);
//         expect(item.content).to.equal('test test test');
//         done();
//       })
//       .catch(function(err){
//         console.error(err);
//         expect(err).to.equal(undefined);
//         done();
//         // .catch(done);
//       });
//     });
//   });
// });
//
// describe('testing storage-unit module', function(){
//   describe('testing fetchItem', function(){
//     //
//     // before((done) => {
//     //   testStoreage.note = {'123': {id: 123, name: 'unicorn'}};
//     //   done();
//     // });
//     //  //
//     // after((done) => {
//     //   delete testStoreage.note;
//     //   done();
//     // });
//     //
//     it('should retrieve the item', function(done){
//       testStoreage.fetchItem('note', {id: 123456, content: 'note test test'})
//       .then(function(item){
//         console.log('hello!');
//         expect(item.id).to.equal(123456);
//         expect(item.content).to.equal('test test test');
//         done();
//       }).catch(function(err){
//         console.error(err);
//         expect(err).to.equal('undefined');
//         done();
//       });
//     });
//     // it('should fetch the item', function(done){
//     //   testStoreage.fetchItem('item', 321).then((item) =>{
//     //     expect(item.id).to.eql(321);
//     //     done();
//     //   }).catch(done);
//     // });
//   });
// });
//
// describe('testing storage-unit module', function(){
//   describe('testing deleteItem', function(){
//     //
//     // after((done) => {
//     //   delete testStoreage.item;
//     //   done();
//     // });
//     //
//     it('should delete the item', function(done){
//       testStoreage.deleteItem('note', {id: 123456, content: 'test test test'})
//       .then(function(item){
//         expect(item.id).to.equal(123456);
//         expect(item.content).to.equal('test test test');
//         done();
//       }).catch(function(err){
//         console.error(err);
//         expect(err).to.equal('undefined');
//         done();
//       });
//     });
//   });
// });
