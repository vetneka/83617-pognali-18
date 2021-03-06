"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var sourcemap = require("gulp-sourcemaps");
var gulpBemCss = require("gulp-bem-css");

var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");

var uglify = require('gulp-uglify');

var server = require("browser-sync").create();
var rename = require("gulp-rename");
var del = require("del");

// Server
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("spriteSvg", "refresh"));
  gulp.watch("source/*.html", gulp.series("copyHtml", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("jsMin", "refresh"));
});

// HTML
gulp.task("copyHtml", function () {
  return gulp.src("source/*.html", {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

// CSS
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("htmlToBem", function () {
  return gulp.src("source/*.html")
    .pipe(gulpBemCss({
      folder: 'source/sass/blocks',
      extension: 'scss',
      elementSeparator: '__',
      modifierSeparator: '--'
    }))
});

// JS
gulp.task("jsMin", function () {
  return gulp.src("source/js/main.js")
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
});

// Images
gulp.task("spriteSvg", function() {
  return gulp.src("source/img/**/icon-*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
});

gulp.task("imageOptim", function() {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/**/icon-*.svg"
  ])
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 85, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: false},
        {cleanupIDs: false},
        {removeStyleElement: true}
      ]
    })
  ]))
  .pipe(gulp.dest("build/img"))
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"))
});

// Other
gulp.task("copyAll", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "!source/img/**/icon-*.svg",
    "source/js/**/*.js",
    "!source/js/main.js",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("clean", function () {
  return del("build")
});

gulp.task("build", gulp.series(
  "clean",
  "copyAll",
  "css",
  "jsMin",
  "webp",
  "spriteSvg",
  "imageOptim"
));

gulp.task("start", gulp.series("build", "server"));
