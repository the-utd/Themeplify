const {
	gulp,
	webpack,
	webpackStream
} = buildify.packages;
const { entries } 	= buildify.helpers;
const webpackConfig = buildify.options.webpack;
const files 		= buildify.files;

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
