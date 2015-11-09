'use strict';
/*
 GULP config App Trollme
 Dev: Gabriel Cueto <TheMushrr00m>
 http://laesporadelhongo.com
 */
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

gulp.task 'coffee', ->
	gulp.src parameters.app_path + '/**/*.coffee'
	.pipe coffee bare: true
	.pipe concat parameters.app_main_file
	.pipe gulp.dest parameters.web_path + '/public/js'
	.on 'error', gutil.log

gulp.task('develop', function () {
    nodemon({
        script: 'app.js', ext: 'html js'})
        .on('restart', function(){
            console.log('Server restarted');
    });
});
