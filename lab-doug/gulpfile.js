'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'lib/*.js', 'model/*.js', 'test/*.js', 'route/*.js'];

gulp.task('eslint', function(){
  gulp.src(paths)
  .pipe(eslint())
  .pipe(eslint.format());
  //.pipe(eslint.failAfterError());
});

gulp.task('nodemon', function(){
  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('test', () => {
  return gulp.src(['./test/matchscore-test.js', './test/matchscore-route-test.js', './test/storage-test.js'], {read: false})
  .pipe(mocha({reporter: 'list'}));
});



gulp.task('default', ['eslint', 'test']);
