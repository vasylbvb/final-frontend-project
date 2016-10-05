var gulp = require("gulp"),
    less = require("gulp-less"),
    nano = require("gulp-cssnano"),
    browserSync = require("browser-sync").create();

gulp.task("html", function () {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("img", function () {
    return gulp.src("src/images/*")
        .pipe(gulp.dest("dist/images"));
});

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task("glyphicons", function () {
    return gulp.src("src/vendor/bootstrap/dist/fonts/*")
        .pipe(gulp.dest("dist/vendor/bootstrap/dist/fonts"));
});

gulp.task("bootstrapcss", function () {
    return gulp.src("src/vendor/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("dist/vendor/bootstrap/dist/css"));
});

gulp.task("bootstrapjs", function () {
    return gulp.src("src/vendor/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("dist/vendor/bootstrap/dist/js"));
});

gulp.task("jqueryjs", function () {
    return gulp.src("src/vendor/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("dist/vendor/jquery/dist"));
});

gulp.task("css", function () {
    return gulp.src("src/css/main.less")
        .pipe(less())
        .pipe(nano())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    browserSync.init({
        server: "dist"
    });

    gulp.watch("src/css/**/*.less", ["css"]);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["html", "css", "img", "fonts", "glyphicons", "bootstrapcss", "bootstrapjs", "jqueryjs", "watch"]);