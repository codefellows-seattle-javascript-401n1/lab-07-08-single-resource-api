'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

gulp.task('test', function(){
  return gulp.src(__dirname + '/test/people-route-test.js')
  .pipe(mocha());
});

gulp.task('lint', function(){
  return gulp.src(__dirname + '/*.js', !'node_modules/')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: 'node_modules/'
  });
});

gulp.task('default', ['lint', 'test']);
