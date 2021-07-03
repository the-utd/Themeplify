const files             = themeplify.files;
const { gulp }          = themeplify.packages;
const { minify }        = themeplify.functions.styles;
const { errorLogger }   = themeplify.helpers;

const watchScssMinify = async () => {
    return gulp.watch(files.minify.css).on("all", function (event, files) {
        gulp.series(...[
            minify(files)
        ])(errorLogger);
    });
};

watchScssMinify.displayName = "scss:minify:watch";

module.exports = watchScssMinify;
