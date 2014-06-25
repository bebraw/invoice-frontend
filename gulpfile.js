/*globals require, console*/
'use strict';
var production = false;
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');

gulp.task('default', ['server', 'watch']);
gulp.task('compile', ['scripts', 'css', 'html', 'assets']);
gulp.task('server', function() {
    return browserSync.init(['build/js/*.js', 'build/index.html'], {
        server: {
            baseDir: './build'
        }
    });
});
gulp.task('watch', ['watchScripts', 'watchHtml', 'watchCSS']);
gulp.task('watchCSS', function() {
    return gulp.watch('src/css/*.css', function() {
        gulp.run('css');
    });
});
gulp.task('watchHtml', function() {
    return gulp.watch('src/index.html', function() {
        gulp.run('html');
    });
});
gulp.task('scripts', function() {
    return scripts(false);
});
gulp.task('watchScripts', function() {
    return scripts(true);
});

function scripts(watch) {
    var bundler, rebundle;
    var scriptFile = './src/js/app.js';
    if (watch) {
        bundler = watchify(scriptFile);
    } else {
        bundler = browserify(scriptFile);
    }
    rebundle = function() {
        var stream = bundler.bundle({
            debug: !production
        });
        stream.on('error', function(err) {
            console.log('Browserify error : ' + err);
        });
        stream = stream.pipe(source('bundle.js'));
        return stream.pipe(gulp.dest('build/js'));
    };
    bundler.on('update', rebundle);
    return rebundle();
}
gulp.task('css', function() {
    return gulp.src('src/css/*.css').pipe(gulp.dest('build/css'));
});
gulp.task('html', function() {
    return gulp.src('src/index.html').pipe(gulp.dest('build'));
});
gulp.task('assets', function() {
    return gulp.src(['src/assets/*.png', 'src/assets/*.jpg']).pipe(imagemin()).pipe(gulp.dest('build/assets'));
});