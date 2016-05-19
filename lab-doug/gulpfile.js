/*
have a test task for running mocha
have a nodemon task that restarts your server any time a change has been bade to your .js files
*/
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('mocha');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const paths = ['*.js', 'lib/*.js', 'model/*.js', 'test/*.js', 'route/*.js'];

gulp.task('lint', function(){
  gulp.src(paths).pipe.eslint()).pipe(eslint.format);
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('mocha', function(){
  return gulp.src(test.js).path();
});

gulp.task('test', function(){
  //run mocha
});

gulp.task('default', ['lint', 'mocha']);
