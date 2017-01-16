/// <binding BeforeBuild='tsconfig-glob' ProjectOpened='watch-webpack' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var del = require("del");
var tsconfig = require("tsconfig-glob");
var ts = require("typescript");
var watch = require("gulp-watch");
var webpack = require("webpack-stream");

var paths = {
    nodeModules: "./node_modules/",
    scripts: "./Scripts/Build/",
    sources: "./Scripts/Sources/",
    wwwRoot: "./wwwroot/scripts/"
};

gulp.task("tsconfig-glob", function () {
    return tsconfig({
        configPath: ".",
        cwd: process.cwd(),
        indent: 2
    });
});



gulp.task("watch-webpack", function () {
    return gulp.src(paths.sources + "main.ts")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(paths.wwwRoot + "app/"));
});

gulp.task("watch-ts", function () {
    //gulp.watch(["scripts/**/*"], ["copy-js"]);
    gulp.watch([paths.sources + "*.ts"], ["tsconfig-glob"]);
});