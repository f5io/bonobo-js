var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    mocaccino = require('mocaccino');

var mochify = require('mochify'),
    through = require('through2');

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
    return mochify('./test/**.js', {
            reporter: 'spec',
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