const { gulp }          = global.buildify.packages;
const { errorLogger }   = require("./errorLogger");

module.exports = function (path, callback) {
    return gulp.watch(path).on("all", function (event, file) {
        if(!["add", "change"].includes(event)) {
            return;
        }

        gulp.series(...[
            callback(`./${file.replace(/\\/g, "/")}`)
        ])(errorLogger);
    });
}