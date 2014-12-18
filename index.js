var gulp = require('gulp'),
    to5 = require('gulp-6to5'),
    notify = require('gulp-notify');
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    elixir = require('laravel-elixir'),
     _ = require('underscore'),
    utilities = require('laravel-elixir/ingredients/helpers/utilities');

elixir.extend('6to5', function (src, outputDir, options) {

    var config = this,
        baseDir = config.assetsDir + 'js',
        defaultOptions;

    defaultOptions = {
    };

    src = utilities.buildGulpSrc(src, baseDir, '**/*.js');

    options = _.extend(defaultOptions, options);

    gulp.task('6to5', function () {
        var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "6to5 Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            })(err);

            this.emit('end');
        };

        return gulp.src(src)
            .pipe(6to5(options)).on('error', onError)
            .pipe(gulpif(config.production, uglify()))
            .pipe(gulp.dest(outputDir || config.jsOutput))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: '6to5 Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('6to5', baseDir + '/**/*.js');

    return this.queueTask('6to5');

});