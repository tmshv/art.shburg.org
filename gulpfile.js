var gulp = require('gulp');
var _if = require('gulp-if');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');
var rename = require("gulp-rename");
var ngAnnotate = require('gulp-ng-annotate');
var named = require('vinyl-named');

var is_production = process.env['NODE_ENV'] == 'production';

gulp.task("concat-bower", function () {
    var files = [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angulartics/dist/angulartics.min.js',
        './bower_components/angulartics/dist/angulartics-ga.min.js',
        './bower_components/spin.js/spin.js',
        './bower_components/angular-spinner/angular-spinner.min.js',
        './bower_components/socket.io-client/socket.io.js'
    ];
    gulp.src(files)
        .pipe(concat("libs.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('styles', function () {
    var processors = [
        require('autoprefixer')({
            browsers: ['last 1 version']
        }),
        require('cssnano')({
            zindex: false
        })
    ];

    gulp.src('./src/style/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task("copy", function () {
    gulp.src('./src/assets/fonts/*')
        .pipe(gulp.dest("./public/fonts"));

    gulp.src('./src/assets/graphics/*')
        .pipe(gulp.dest("./public/graphics"));

    gulp.src([
            './src/3rdparty/*',
            './robots.txt'
        ])
        .pipe(gulp.dest("./public"));
});

gulp.task('compile', function () {
    gulp.src([
            './src/client/app.js',
            './src/client/document.js',
            './src/client/data.js',
            './src/client/instagram.js'
        ])
        .pipe(named())
        .pipe(webpack({
            output: {
                filename : '[name].js'
            },
            module: {
                loaders: [
                    { test: /\.js$/, loader: 'babel' },
                    { test: /\.html$/, loader: 'html' }
                ]
            }
        }))
        .pipe(_if(is_production, ngAnnotate()))
        .pipe(_if(is_production, minify()))
        .pipe(gulp.dest('./public'));
});

gulp.task("imagemin", function () {
    gulp.src('./src/assets/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest("./public/img"));
});

gulp.task('default', ['styles', 'compile']);
gulp.task('deploy', ['default', 'copy', 'imagemin']);
