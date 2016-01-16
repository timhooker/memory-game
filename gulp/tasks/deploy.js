// deploy pushes the contents of dist to gh-pages

var gulp = require('gulp'),
    deploy = require('gulp-gh-pages'),
    config = require('../config');

gulp.task('deploy', ['clean'], function () {
  return gulp.start('assets', 'html', 'push-gh-pages');
});

gulp.task('push-gh-pages', ['assets', 'html'], function () {
  return gulp.src(config.dest.root + '/**/*')
    .pipe(deploy());
});
