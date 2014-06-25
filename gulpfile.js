/*globals require, console*/
var production = false;

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify');

gulp.task('default', ['server', 'watch']);
gulp.task('compile', ['scripts', 'html', 'assets']);

gulp.task('server', function () {
  return browserSync.init(['build/js/*.js', 'build/index.html'], {
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', ['watchScripts', 'watchHtml']);

gulp.task('watchHtml', function () {
  return gulp.watch('src/index.html', function () {
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
  var scriptFile = './src/js/app.jsx';

  if(watch) {
    bundler = watchify(scriptFile);
  } else {
    bundler = browserify(scriptFile);
  }
 
  bundler.transform(reactify);
 
  rebundle = function() {
    var stream = bundler.bundle({debug: !production});
    stream.on('error', function(err){ console.log('Browserify error : ' + err);});
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest('build/js'));
  };
 
  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('assets', function () {
  return gulp.src(['src/assets/*.png', 'src/assets/*.jpg'])
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets'));
});

