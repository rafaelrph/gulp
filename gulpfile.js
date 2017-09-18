var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('build-img', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'));
});

gulp.task('default', ['build-img'], function() {
    console.log("Gulp is running");
})