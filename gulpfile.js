const gulp = require("gulp"); // the main gulp gulp.task(..) gulp.pipe(..) and so on ...
const clean = require("gulp-clean"); //
const browserSync = require("browser-sync").create(); //create the web server that we i'm going to use

//
gulp.task("clean", function() {
    gulp.src("./dist").pipe(clean());
  });


//
  gulp.task("browser-sync", function() {
    browserSync.init(null, {
      open: true, //in order to open the browser atumatically
      server: {
        baseDir: "dist"
      }
    });
  });



/***** *****/
gulp.task("html", function() {
    gulp
      .src(["./src/templates/index.html"])
      .pipe(gulp.dest("./dist/")) //
      .pipe(
        browserSync.reload({
          stream: true
        })
      );
  });
  