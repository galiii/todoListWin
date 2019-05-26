const gulp = require("gulp"); // the main gulp gulp.task(..) gulp.pipe(..) and so on ...
const clean = require("gulp-clean"); //
const browserSync = require("browser-sync").create(); //create the web server that we i'm going to use
const webpack = require("webpack");
const gutil = require('plugin-error');
const sass = require("gulp-sass");
sass.compiler = require('node-sass');



//
gulp.task("clean", function () {
  gulp.src("./dist").pipe(clean());
});


//
gulp.task("browser-sync", function () {
  browserSync.init(null, {
    open: true, //in order to open the browser atumatically
    server: {
      baseDir: "dist"
    }
  });
});


//
gulp.task("html", function () {
  gulp
    .src(["./src/templates/index.html"])
    .pipe(gulp.dest("./dist/")) //
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});


gulp.task("webpack", function (clbk) {
  webpack(
    {
      entry: "./src/app/app.js",
      output: {
        path: __dirname + "/dist/js",
        filename: "scripts.js"
      },
      devtool: "source-map", //for developer to see the js and do debug instead of using debbugar
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: "raw-loader"
          },
          {
            test: /\.(jpg|png|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name][ext]",
                  outputPath: "img/",
                  publicPath: "img/"
                }
              }
            ]
          }
        ]
      }
    },
    function (err, stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      //else
      gutil.log(
        "[webpack]",
        stats.toString({
          colors: true,
          chunks: false,
          errorDetails: true
        })
      );
      clbk(); //
    }
  );
});



gulp.task("sass", function () {
  gulp
    .src(["./src/scss/main.scss"])
    .pipe(sass().on('error', sass.logError)) //to take the result (of the preview line) and pass at through sass() will convert to css
    .pipe(gulp.dest("./dist/css")) // where we want out result to be save
    /*
     will tell it to reload my browser , 
     when we develop in the backround 
     so i don't have to refresh the page
     */
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});



//actually what build my app
gulp.task("build", function () {
  gulp.start(["sass", "webpack", "html"]);
});

//for url
gulp.task("browser-sync", function () {
  browserSync.init(null, {
    open: true, //in order to open the browser atumatically
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task("start", function() {
  gulp.start(["build", "browser-sync"]);

  //watch = this directive for changes and if you change any js file run again ...
  gulp.watch(["./src/scss/**/*.scss"], ["sass"]);

  //watch = this directive for changes and if you change any js file run again ...
  gulp.watch(["./src/app/**/**/*.js"], ["webpack"]);

  //watch = this directive for changes and if you change any html file run again ...
  gulp.watch(["./src/templates/index.html", "./src/app/**/*.html"], ["html"]);
});


gulp.task("clean", function() {
  gulp.src("./dist").pipe(clean());
});