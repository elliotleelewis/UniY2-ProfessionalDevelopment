'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
gulp.task('babel', function() {
	return gulp.src('src/js/index.jsx')
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(gulp.dest('build/js'));
});
gulp.task('sass', function() {
	return gulp.src('src/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
});
gulp.task('watch', function() {
	gulp.watch('src/js/*.jsx', ['babel']);
	gulp.watch('src/css/*.scss', ['sass']);
});
gulp.task('default', ['babel', 'sass']);