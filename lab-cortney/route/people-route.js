'use strict';

const People = require('../model/people');
const response = require('../lib/response');
const Storage = require('../lib/storage');
const fs = require('fs');

const dataDir = new Storage(`${__dirname}/../storage`);

module.exports = function(router){
  router
  .post('/api/people', function(req, res){

    if (req.body.name){
      const person = new People(req.body.name);
      dataDir.setItem('people', person)
        .then(function() {
          return response(200, person)(res);
        })
        .catch(function(err){
          console.error('ERROR POSTING:', err);
          return response(400, 'bad request!')(res);
        });
    }

  })
  .get('/api/people', function(req, res){

    var id = req.query.id;

    fs.stat(__dirname + '/../storage/people/' + id + '.json', function(err, data){
      if (err) {
        console.error('ERROR FETCHING FILE:', err);
        return;
      } if (data.isFile()){
        dataDir.fetchItem('people', id)
          .then(function(peep){
            return response(200, peep)(res);
          })
          .catch(function(err){
            console.error('ERROR GETTING:', err);
            return response(404, 'not found')(res);
          });
      }
    });
    response(400, 'bad request')(res);
// This was the bonus '/api/people/all' code before lab-08 refactoring.
// Maybe one day, I'll make it work...........................

  // .get('/api/people/all', function(req, res){
  //
  //   for (var peep in peepPool){
  //     if (peep){
  //       return response(200, peepPool)(res);
  //     }
  //   }
  //   return response(400, 'hmm, nobody here. try POSTing a peep?')(res);

  })
  .delete('/api/people', function(req, res){

    if (req.body){
      var id = req.body.id;
      var path = __dirname + '/../storage/people/' + id + '.json';
      dataDir.deleteItem('people', path)
      .then(function(){
        response(200, 'successfully deleted file')(res);
      });
      return response(400, 'bad delete request')(res);
    }
    return response(404, 'not found')(res);
  }); // end of delete route

}; // end of module.exports router
