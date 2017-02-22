'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('watch', () => {

        browserSync.init({
            server: {
                baseDir: 'app'
            },
            browser: 'google chrome',
            notify: false
        });

        watch('./app/index.html', () => browserSync.reload());
        watch('./app/assets/styles/**/*.css', () => gulp.start('cssInject'));
    }
);

gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});