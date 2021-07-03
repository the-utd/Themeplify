const { gulp }      = themeplify.packages;
const buildScss 	= require("../../tasks/styles/build");

const watchScssCompile = () => {
	global.sassWatch = false;

	return gulp.watch("./src/styles/**/*.{scss,sass,css}", buildScss);
};

watchScssCompile.displayName = "scss:compile:watch";

module.exports = watchScssCompile;
