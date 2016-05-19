'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');

//*.js will look for gulpfile and server.js//
const paths = ['*./js', 'lib/*.js', 'model/*.js;', 'test/*.js', 'route/*.js'];

//first item is always the name of the task, second thing can be an array of the dependencies of this task//
gulp.task('lint', function(){
  gulp.src(paths).pipe(eslint())
  .pipe(eslint.format);
});

gulp.task('test', function(){
  return gulp.src('test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js'
    , ext: 'js'
    , env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['lint', 'test']);
