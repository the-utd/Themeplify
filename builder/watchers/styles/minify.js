const files             = buildify.files;
const { gulp }          = buildify.packages;
const { minify }        = buildify.functions.styles;
const { errorLogger }   = buildify.helpers;

const watchScssMinify = async () => {
    return gulp.watch(files.minify.css).on("all", function (event, files) {
        gulp.series(...[
            minify(files)
        ])(errorLogger);
    });
};

watchScssMinify.displayName = "scss:minify:watch";

module.exports = watchScssMinify;