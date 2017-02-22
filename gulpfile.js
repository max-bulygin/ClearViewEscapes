'use strict'

const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProps = require('postcss-custom-properties');
const cssImport = require('postcss-import');

gulp.task('html', () => console.log("html"));
gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, customProps, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', () => {
        watch('./app/index.html', () => gulp.start('html'));
        watch('./app/assets/styles/**/*.css', () => gulp.start('styles'));
    }
);