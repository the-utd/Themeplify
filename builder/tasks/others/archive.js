const { gulp, zip, datetime } = buildify.packages;

const archive = () => {
    const now = datetime.create();

    return gulp.src("./dist/**")
        .pipe(zip(`theme-${now.format("d-m-Y-H-M-S")}.zip`))
        .pipe(gulp.dest("./uploads"));
}

archive.displayName = "archive";

module.exports = archive;