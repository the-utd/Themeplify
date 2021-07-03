const { gulp, prettier, rename } = themeplify.packages;

const svgUpdate = () => {
    return gulp.src("./src/snippets/icon-*.liquid")
        .pipe(prettier({
            parser: "html"
        }))
        .pipe(rename({
            extname: ".svg",
            dirname: ""
        }))
        .pipe(gulp.dest("./src/icons"));
}

svgUpdate.displayName = "svg:update";

module.exports = svgUpdate;
