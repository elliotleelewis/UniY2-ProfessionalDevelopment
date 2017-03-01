'use strict';
const gulp = require('gulp');
const fs = require('fs');
const browserify = require('browserify');
const sass = require('gulp-sass');
const dir = './build';
if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}
gulp.task('js', function() {
	return browserify('src/js/index.jsx')
		.transform("babelify", {presets: ['es2015', 'react']})
		.bundle()
		.pipe(fs.createWriteStream(dir + '/js/app.js'));
});
gulp.task('sass', function() {
	return gulp.src('src/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(dir + '/css'));
});
gulp.task('watch', ['default'], function() {
	gulp.watch(['src/data/*.json', 'src/js/*.jsx'], ['js']);
	gulp.watch('src/css/*.scss', ['sass']);
});
gulp.task('default', ['js', 'sass']);