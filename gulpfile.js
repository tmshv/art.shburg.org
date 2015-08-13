var path = require("path");
var gulp = require("gulp");
var gulp_if = require("gulp-if");
var sass = require("gulp-sass");
var babel = require("babelify");
var minify_css = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var browserify = require("gulp-browserify");
var annotate = require("browserify-ngannotate");

var is_production = process.env['NODE_ENV'] == 'production';

gulp.task("concat-bower", function () {
	var files = [
		"public/bower_components/jquery/dist/jquery.min.js",
		"public/bower_components/angular/angular.min.js",
		"public/bower_components/angular-route/angular-route.min.js",
		"public/bower_components/angular-animate/angular-animate.min.js",
		"public/bower_components/angulartics/dist/angulartics.min.js",
		"public/bower_components/angulartics/dist/angulartics-ga.min.js",
		"public/bower_components/spin.js/spin.js",
		"public/bower_components/angular-spinner/angular-spinner.min.js",
		"public/bower_components/socket.io-client/socket.io.js"
	];
    gulp.src(files)
		.pipe(concat("libs.js"))
		.pipe(uglify())
        .pipe(gulp.dest("public"));
});

gulp.task("sass", function () {
    gulp.src("./assets/style/*.scss")
        .pipe(sass())
		.pipe(concat("style.css"))
		.pipe(autoprefixer())
        .pipe(minify_css({processImport:false}))
        .pipe(gulp.dest("public"));
});

gulp.task("copy", function(){
	gulp.src("./assets/fonts/*")
		.pipe(gulp.dest("./public/fonts"));

	gulp.src("./assets/graphics/*")
		.pipe(gulp.dest("./public/graphics"));

	gulp.src([
		"./3rdparty/*",
		"robots.txt"
	])
		.pipe(gulp.dest("./public"));
});

gulp.task("compile", function(){
	gulp.src([
		"client/app.js",
		"client/document.js",
		"client/data.js",
		"client/instagram.js"
	])
		.pipe(browserify({
			transform: [annotate, babel]
		}))
		.pipe(gulp_if(is_production, uglify()))
		.pipe(gulp.dest("public"));
});

gulp.task("imagemin", function(){
	gulp.src("./assets/img/**/*")
		.pipe(imageMin())
		.pipe(gulp.dest("./public/img"));
});

gulp.task("default", ["sass", "compile"]);
gulp.task("deploy", ["default", "copy", "imagemin"]);
