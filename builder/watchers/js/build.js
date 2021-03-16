const files             = buildify.files;
const { gulp }          = buildify.packages;
const { build }         = buildify.functions.js;
const { errorLogger }   = buildify.helpers;

const jsWatch = async () => {
    return gulp.watch(files.js).on("all", function (event, file) {
        gulp.series([
            build(`./${file.replace(/\\/g, "/")}`)
        ])(errorLogger);
    });
};

jsWatch.displayName = "js:watch";

module.exports = jsWatch;