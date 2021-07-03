const files             = themeplify.files;
const { gulp }          = themeplify.packages;
const { build }         = themeplify.functions.js;
const { errorLogger }   = themeplify.helpers;

const jsWatch = async () => {
    return gulp.watch(files.js).on("all", function (event, file) {
        gulp.series([
            build(`./${file.replace(/\\/g, "/")}`)
        ])(errorLogger);
    });
};

jsWatch.displayName = "js:watch";

module.exports = jsWatch;
