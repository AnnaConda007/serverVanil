const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const strip = require('gulp-strip-comments');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();
const copy = require('gulp-copy');

gulp.task('dev', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(['src/js/**/*.js', 'src/css/**/*.css', 'src/*.html'], gulp.series('build')).on('change', browserSync.reload);
});

gulp.task('build', function (done) {
    gulp.src('src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/css/bootstrap.min.css')
        .pipe(copy('dist/css', { prefix: 2 }))
    gulp.src(['src/css/**/*.css', '!src/css/bootstrap.min.css'])
        .pipe(concat('style.min.css'))
        .pipe(cssnano({
            discardComments: false,
            mergeRules: false,
            reduceTransforms: false,
            reducePositions: false,
            discardUnused: false,
            discardDuplicates: false,
            discardOverridden: false,
            mergeLonghand: false,
            mergeIdents: false,
            reduceIdents: false,
            reduceInitial: false,
            zindex: false,
            colormin: false,
            svgo: false,
            minifyFontValues: false
        }))
        .pipe(gulp.dest('dist/css'))
    gulp.src('src/*.html')
        .pipe(strip())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(replace('script.js', 'script.min.js'))
        .pipe(gulp.dest('dist'))
        .on('end', done);
})