const gulp = require('gulp');
const sprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');

const config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
};

gulp.task('clean', () => {
    return del(['./app/temp/sprite', './app/assets/images/sprites'])
});

gulp.task('sprite', ['clean'], () => {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(sprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['sprite'], () => {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'))
});

gulp.task('copySpriteCss', ['sprite'], () => {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCss'], () => { return del('./app/temp/sprite') });

gulp.task('icons', ['clean','sprite', 'copySpriteGraphic', 'copySpriteCss', 'endClean']);