const {
	gulp,
	webpack,
	webpackStream
} = themeplify.packages;
const { entries } 	= themeplify.helpers;
const webpackConfig = themeplify.options.webpack;
const files 		= themeplify.files;

module.exports = (jsFiles = files.js, options = {}) => {
	return new Promise((resolve, reject) => {
		const entryFiles = entries('src/scripts/**.js');

		if(entryFiles && !Object.values(entryFiles).length) {
			return resolve(true);
		}

		return gulp.src(jsFiles, options)
			.pipe(webpackStream({
				...webpackConfig,
				entry: entryFiles,
				mode: "production"
			}, webpack))
			.pipe(gulp.dest(files.compileOutput))
			.on("end", resolve)
			.on("error", reject);
	});
};
