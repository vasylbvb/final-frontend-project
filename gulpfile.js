var gulp = require("gulp"),
    less = require("gulp-less"),
    nano = require("gulp-cssnano"),
    browserSync = require("browser-sync").create(),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    addSrc = require("gulp-add-src"),
    rjo = require("gulp-requirejs-optimize");

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("img", function () {
    return gulp.src("src/images/*")
        .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function () {
    return gulp.src([
        "src/vendor/bootstrap/dist/fonts/*.*",
        "src/fonts/*"
    ])
        .pipe(gulp.dest("dist/fonts"));
});

/*gulp.task("glyphicons", function () {
 return gulp.src("src/vendor/bootstrap/dist/fonts/!*")
 .pipe(gulp.dest("dist/vendor/bootstrap/dist/fonts"));
 });*/
/*gulp.task("vendor-css", function () {
 return gulp.src([
 "src/vendor/bootstrap/dist/css/bootstrap.css",
 "src/vendor/font-awesome/css/font-awesome.css"
 ])
 .pipe(nano())
 .pipe(concat("vendor.min.css"))
 .pipe(gulp.dest("dist/css"))
 });*/
gulp.task("vendor-css", function () {
    return gulp.src([
        "src/vendor/bootstrap/dist/css/bootstrap.css",
        "src/vendor/datatables.net-bs/css/dataTables.bootstrap.css"
    ])
        .pipe(concat("bootstrap.css"))
        .pipe(nano())
        .pipe(gulp.dest("dist/css"));
});
gulp.task("css", function () {
    return gulp.src("src/css/main.less")
        .pipe(less())
        .pipe(nano())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});
gulp.task("vendor-js", function () {
    return gulp.src([
        "src/vendor/bootstrap/dist/js/bootstrap.js",
        "src/vendor/datatables.net/js/jquery.dataTables.js",
        "src/vendor/datatables.net-bs/js/dataTables.bootstrap.js"
    ])
        .pipe(addSrc.prepend("src/vendor/jquery/dist/jquery.js"))
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
gulp.task("app-js", function () {
    return gulp.src(["src/js/main.js",
        "src/js/map.js"])
        .pipe(uglify())
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest("dist/js"))
});
gulp.task("jqueryjs", function () {
    return gulp.src("src/vendor/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("dist/js"));
});
gulp.task("table", function () {
    return gulp.src("src/js/database/databaseTables.json")
        .pipe(gulp.dest("dist/js/database"))
});
gulp.task("watch", function () {
    browserSync.init({
        server: "dist"
    });

    gulp.watch("src/css/**/*.less", ["css"]);
    gulp.watch("src/js/**/*.js", ["app-js"]);
    gulp.watch("src/js/database/*.json", ["table"]);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["html", "img", "fonts", "vendor-css", "css", "vendor-js", "jqueryjs", "app-js", "table", "watch"]);