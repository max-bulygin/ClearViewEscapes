'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProps = require('postcss-custom-properties');
const cssImport = require('postcss-import');

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, customProps, autoprefixer]))
        .on('error', (error) => {
            gutil.log(error.message);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});
