const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
    browserSync.init({
        server: {
            baseDir: 'docs'
        },
        browser: 'google chrome',
        notify: false
    });
});

gulp.task('clearDistFolder', ['icons'], () => {
    return del('./docs')
});

gulp.task('copyGeneralFiles', ['clearDistFolder'], () => {
    let pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'))
});

gulp.task('optimizeImages', ['clearDistFolder'], () => {
    gulp.src([
        './app/assets/images/**/*.*',   // select all files
        '!app/assets/images/icons',     //exclude icons folder
        '!app/assets/images/icons/**/*' //exclude all files in icons subfolders
    ])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/images/'));
});

gulp.task('useminTrigger', ['clearDistFolder'], () => {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [() => rev(), () => cssnano()],
            js: [() => rev()]
        }))
        .pipe(gulp.dest('./docs'))
});

gulp.task('build', ['clearDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);