const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');

gulp.task('dev', function () {
    gulp.watch(['src/js/**/*.js', 'src/css/**/*.css'], gulp.series('build'));
});

gulp.task('build', function (done) {
    gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/css/**/*.css')
        .pipe(concat('app.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
})