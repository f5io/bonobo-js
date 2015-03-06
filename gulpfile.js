var gulp = require('gulp'),
    mochify = require('mochify'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var path = require('path');

gulp.task('build', function() {
    return browserify({
            entries: './src/index.js',
            debug: true
        })
        .transform(babelify)
        .bundle()
        .on('error', function(err) {
            console.error('Browserify failed!');
            this.end();
        })
        .pipe(source('bonobo.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function() {
    return mochify('./test/**/*.js', {
            wd: true,
            reporter: 'spec', // 'list' for durations, 'spec' looks better
            phantomjs: './node_modules/phantomjs/bin/phantomjs'
        })
        .transform(babelify)
        .bundle();
});

gulp.task('watch', ['build', 'test'], function() {
    gulp.watch('src/**/*.js', ['build', 'test']);
    gulp.watch('test/**/*.js', ['test']);
});

gulp.task('default', ['watch']);