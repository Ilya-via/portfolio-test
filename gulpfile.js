'use strict';

// connections
var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	terser = require('gulp-terser'),
	reload = browserSync.reload;

// paths
var path = {
	build: {
		html: 'assets/',
		js: 'assets/js/',
		vendor: 'assets/js/vendor',
		css: 'assets/',
		images: 'assets/styles/images/',
		fonts: 'assets/styles/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		vendor: 'src/js/vendor/**/*.js',
		style: 'src/styles/style.scss',
		images: 'src/styles/images/**/*.*',
		fonts: 'src/styles/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/*.js',
		vendor: 'src/js/vendor/**/*.js',
		style: 'src/styles/**/*.scss',
		images: 'src/styles/images/**/*.*',
		fonts: 'src/styles/fonts/**/*.*'
	},
	clean: './assets'
};

// configs
var config = {
	server: {
		baseDir: "./assets"
	},
	//tunnel: true,
	host: 'localhost',
	port: 3000,
	browser: "chrome"
	// browser: "firefox"
};

//build
function html() {
	return gulp
		.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream());
}

function vendor() {
	return gulp
		.src(path.src.vendor)
		.pipe(gulp.dest(path.build.vendor))
		.pipe(browserSync.stream());
}

function js() {
	return gulp
		.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest('./assets/js/nomini'))
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream());
}

function es() {
	return gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets/js/'))
		.pipe(browserSync.stream());
}
function cssVendor() {
	return gulp
		.src('src/styles/css/**/*.*')
		.pipe(gulp.dest('./assets/css'));
}
function css() {
	return gulp
		.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest('./assets/js/nomini'))
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
}

function images() {
	return gulp
		.src(path.src.images)
		.pipe(gulp.dest(path.build.images))
		.pipe(browserSync.stream());
}

function fonts() {
	return gulp
		.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
}

gulp.task('build', gulp.parallel(html, vendor, js, css, fonts, images, cssVendor));


//watch
gulp.task('watch', function () {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.style, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.fonts, fonts);
	// gulp.watch(path.watch.js, ehs);
});


gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));