var gulp = require('gulp'),
    6to5 = require('gulp-6to5'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    _ = require('underscore'),
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    notification = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('6to5', function (src, outputDir, options) {

    var config = this,
        defaultOptions = {
            debug:         ! config.production,
            srcDir:        config.assetsDir + 'js',
            output:        config.jsOutput
        };

    options = _.extend(defaultOptions, options);
    src = "./" + utilities.buildGulpSrc(src, options.srcDir);

    gulp.task('6to5', function () {

        var onError = function(e) {
            new notification().error(e, '6to5 Failed!');
            this.emit('end');
        };

        return gulp.src(src)
            .pipe(6to5(options)).on('error', onError)
            .pipe(gulpIf(! options.debug, uglify()))
            .pipe(gulp.dest(options.output))
            .pipe(new notification().message('6to5 Compiled!'));
    });

    this.registerWatcher('6to5', options.srcDir + '/**/*.js');

    return this.queueTask('6to5');

});