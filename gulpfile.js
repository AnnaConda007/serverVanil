const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const strip = require('gulp-strip-comments');
const replace = require('gulp-replace');
const rename = require('gulp-rename');

const copy = require('gulp-copy');

gulp.task('dev', function () {
    gulp.watch(['src/js/**/*.js', 'src/css/**/*.css'], gulp.series('build'));
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
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
    gulp.src('src/*.html')
        .pipe(strip())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(replace('script.js', 'script.min.js'))
        .pipe(gulp.dest('dist'))
        .on('end', done);
})