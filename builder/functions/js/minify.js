const { gulp, minify } 	= themeplify.packages;
const files 			= themeplify.files;

module.exports = (jsFiles = files.minify.js, options = {}) => {
	return new Promise((resolve, reject) => {
		return gulp.src(jsFiles, options)
			.pipe(minify({
				ext: {
					min: '.min.js'
				},
				ignoreFiles: [
					".build.min.js"
				]
			}))
			.pipe(gulp.dest(files.compileOutput))
			.on("end", resolve)
			.on("error", reject);
	});
};
