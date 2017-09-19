var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    jsHint = require('gulp-jshint'),
    jsHintStylish = require('jshint-stylish'),
    cssLint = require('gulp-csslint');

gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'build-all');
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'));
});

gulp.task('build-all', function() {
    gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [cssmin]
        })).pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    
    gulp.watch('src/js/*.js').on('change', function(event) {
        gulp.src(event.path)
            .pipe(jsHint())
            .pipe(jsHint.reporter(jsHintStylish));
    });

    gulp.watch('src/css/*.css').on('change', function(event) {
        gulp.src(event.path)
            .pipe(cssLint())
            .pipe(cssLint.formatter());
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});