'use strict';

const gulp = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass');

const path = {
    sass: 'src/sass/*.sass',
    pug: 'src/**/*.pug',
    assets: 'src/assets/**/*'
};

gulp.task('default', ['pug', 'sass', 'assets']);

gulp.task('pug', function () {
    return gulp.src('src/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

gulp.task('assets', function () {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('build/assets'))
});

gulp.task('watch', function () {
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.pug, ['pug']);
    gulp.watch(path.assets, ['assets'])
});