const { gulp, prettier, rename } = global.buildify.packages;

const svgUpdate = () => {
    return gulp.src("./src/snippets/icon-*.liquid")
        .pipe(prettier({
            parser: "html"
        }))
        .pipe(rename({
            extname: ".svg",
            dirname: "./src/icons"
        }))
        .pipe(gulp.dest("./src/icons"));
}

svgUpdate.displayName = "svg:update";

module.exports = svgUpdate;