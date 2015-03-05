var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('scripts', function() {
    return browserify({
            entries: './src/index.js',
            debug: true
        })
        .transform(babelify)
        .on('error', function(err) {
            console.error('Browserify failed!');
            this.end();
        })
        .bundle()
        .pipe(source('bonobo.js'))
        .pipe(gulp.dest('./dist'));
});