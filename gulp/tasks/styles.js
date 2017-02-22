'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProps = require('postcss-custom-properties');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');
const nesting = require('postcss-nesting');

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, mixins, nesting,customProps, autoprefixer]))
        .on('error', (error) => {
            gutil.log(error.message);
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});
