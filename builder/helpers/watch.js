const { gulp }          = buildify.packages;
const { errorLogger }   = require("./errorLogger");

module.exports = function (path, callback, onDelete = null) {
    return gulp.watch(path).on("all", function (event, file) {
    	switch (event) {
			case "add":
			case "change": {
				gulp.series(...[
					callback(`./${file.replace(/\\/g, "/")}`)
				])(errorLogger);
			}
			break;
			case "unlink":
			case "unlinkDir": {
				if(onDelete) {
					gulp.series(...[
						onDelete(`./${file.replace(/\\/g, "/").replace("src", "dist")}`),
					])(errorLogger);
				}
			}
			break;
		}
    });
}