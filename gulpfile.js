'use strict';
const gulp = require('gulp');
const fs = require('fs');
const browserify = require('browserify');
const sass = require('gulp-sass');
gulp.task('js', function() {
	return browserify('src/js/index.jsx')
		.transform("babelify", {presets: ['es2015', 'react']})
		.bundle()
		.pipe(fs.createWriteStream('build/js/app.js'));
});
gulp.task('sass', function() {
	return gulp.src('src/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
});
gulp.task('watch', ['default'], function() {
	gulp.watch(['src/data/*.json', 'src/js/*.jsx'], ['js']);
	gulp.watch('src/css/*.scss', ['sass']);
});
gulp.task('default', ['js', 'sass']);