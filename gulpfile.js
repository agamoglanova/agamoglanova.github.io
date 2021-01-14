
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var	rigger        = require('gulp-rigger');
var rimraf = require('rimraf');


sass.compiler = require('node-sass');




/* ------------ Styles compile ------------- */
gulp.task('sass', function () {
    return gulp.src('source/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream())
});

/* ------------ Templates compile ------------- */
gulp.task('riger', function () {
    return gulp.src('source/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build'))
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
    return gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------ Copy js ------------- */
gulp.task('copy:js', function() {
    return gulp.src('source/js/**/*.*')
        .pipe(gulp.dest('build/js'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:js'));

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});




/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch('source/**/*.html', gulp.series('riger'));
    gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('source/js/**/*.js', gulp.series('copy:js'));
});

/* -------- Server  -------- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('riger', 'sass', 'copy'),
    gulp.parallel('watch', 'server')
    )
);
