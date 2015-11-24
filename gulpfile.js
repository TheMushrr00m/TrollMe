/*
	 GULP config file - App Trollme
	 Dev: Gabriel Cueto <TheMushrr00m>
	 http://laesporadelhongo.com
 */
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
	coffee = require('gulp-coffee'),
	coffeelint = require('gulp-coffeelint'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
    prefix = require('gulp-autoprefixer'),
    notify = require("gulp-notify");

var paths = {
	//  HTML Files
	HTML_SOURCE: 'views/**/*.jade',

	//  SASS / CSS Files
	SASS_SOURCE: 'assets/sass/**/*.scss',
	SASS_DEST: 'www/css/',

	//  Coffee Script Files
	COFFEE_SOURCE: 'assets/coffee/*.coffee',
	COFFEE_SOURCE_SERVER: 'assets/coffee/server/*.coffee',
	COFFEE_SOURCE_ROUTES: 'assets/coffee/routes/*.coffee',
	COFFEE_DEST: 'www/js/',
	COFFEE_DEST_SERVER: './',
	COFFEE_DEST_ROUTES: './routes/',

	//  Images Source
	IMAGE_SOURCE: 'assets/images/**/*',
	IMAGE_DEST: 'www/images/',

	//  Icons
    ICONS_SOURCE: "src/sass/app/components/icons/svg/*.svg",
    ICONS_DEST: "build/css/fonts/",
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

//  Compile Our Coffee Script Server Files
gulp.task('coffee_server', function() {
	gulp.src(paths.COFFEE_SOURCE_SERVER)
	.pipe(coffee({bare:true})
		.on('error', gutil.log))
    .pipe(gulp.dest(paths.COFFEE_DEST_SERVER))
});

//  Compile Our Coffee Script Files
gulp.task('coffee', function() {
	gulp.src(paths.COFFEE_SOURCE)
	.pipe(coffee({bare:true})
		.on('error', gutil.log))
    .pipe(gulp.dest(paths.COFFEE_DEST))
});

//  Compile Our Coffee Routes Files
gulp.task('coffee_controllers', function() {
	gulp.src(paths.COFFEE_SOURCE_ROUTES)
	.pipe(coffee({bare:true})
		.on('error', gutil.log))
    .pipe(gulp.dest(paths.COFFEE_DEST_ROUTES))
});

gulp.task('lint', function() {
    gulp.src([paths.COFFEE_SOURCE, paths.COFFEE_SOURCE_SERVER])
	.pipe(coffeelint())
	.pipe(coffeelint.reporter())
});

gulp.task('default', function() {
	gulp.watch(paths.SASS_SOURCE, ['sass']);
	gulp.watch(paths.COFFEE_SOURCE, ['coffee','lint']);
	gulp.watch(paths.COFFEE_SOURCE_SERVER, ['coffee_server']);
	/*gulp.watch(paths.COFFEE_SOURCE_CONFIG, ['coffee_config']);*/
	gulp.watch(paths.COFFEE_SOURCE_CONTROLLERS, ['coffee_controllers']);
	nodemon({
		script: 'server.js', ext: 'jade coffee'})
        .on('restart', function(){
        	console.log('Server restarted');
    });
});

//  Watch .COFFEE & .SCSS files
gulp.watch([paths.COFFEE_SOURCE, paths.COFFEE_SOURCE_SERVER], ['coffee','lint']);
gulp.watch(paths.SASS_SOURCE, ['sass']);
// gulp.watch( paths.HTML_SOURCE , ['html'] );
// gulp.watch( paths.IMAGE_SOURCE , ['images'] );