/*
 GULP config file - App Trollme
 Dev: Gabriel Cueto <TheMushrr00m>
 http://laesporadelhongo.com
 */
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	coffeelint = require('gulp-coffeelint'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify");

var paths = {
	//  HTML Files
	HTML_SOURCE: 'views/**/*.jade',

	//  SASS / CSS Files
	SASS_SOURCE: 'assets/sass/**/*.scss',
	SASS_DEST: 'public/css/',

	//  Coffee Script Files
	COFFEE_SOURCE: 'assets/coffee/**/*.coffee',
	COFFEE_DEST: 'public/js/',

	//  Images Source
	IMAGE_SOURCE: 'assets/images/**/*',
	IMAGE_DEST: 'public/images/',

	//  Icons
    ICONS_SOURCE    : "src/sass/app/components/icons/svg/*.svg",
    ICONS_DEST      : "build/css/fonts/",
};

//  Compile our SASS Files
gulp.task('sass', function() {
	gulp.src(paths.SASS_SOURCE)
	.pipe(plumber())
	.pipe(sass({
		outputStyle: 'compressed',
		//  sourceComments: 'map'
	}))
	.on('error', notify.onError())
	.on('error', function(err) {
		console.log('Error: ', err)
	})
	.pipe(prefix(
		'last 2 versions',
		'>10%'
	))
	.pipe(gulp.dest(paths.SASS_DEST))
});

//  Compile Our Coffee Script Files
gulp.task('coffee', function() {
	gulp.src(paths.COFFEE_SOURCE)
	.pipe(coffee({bare:true})
		.on('error', gutil.log))
    .pipe(gulp.dest(paths.COFFEE_DEST))
});

gulp.task('lint', function() {
    gulp.src(paths.COFFEE_SOURCE)
	.pipe(coffeelint())
	.pipe(coffeelint.reporter())
});

gulp.task('default', function() {
	gulp.watch(paths.SASS_SOURCE, ['sass']);
	gulp.watch(paths.COFFEE_SOURCE, ['coffee','lint']);
	nodemon({
		script: 'app.js', ext: 'jade coffee'})
        .on('restart', function(){
        	console.log('Server restarted');
    });
});

//  Watch .SCSS files
gulp.watch(paths.COFFEE_SOURCE, ['coffee','lint']);
gulp.watch(paths.SASS_SOURCE, ['sass']);
// gulp.watch( paths.HTML_SOURCE , ['html'] );
// gulp.watch( paths.IMAGE_SOURCE , ['images'] );