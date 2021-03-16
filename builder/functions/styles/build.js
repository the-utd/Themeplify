const { themeRoot }		= buildify;
const {
	gulp,
	rename,
	fibers,
	plumber,
	sass,
	sourcemaps,
	postcss,
	gulpif,
	cached,
	sassInheritance,
	filter
} = buildify.packages;

const files 	= buildify.files;
const path		= require("path");
const plugins 	= Object.values(buildify.options.postcss.plugins);

module.exports = (scssFiles = files.scss, options = {}) => {
	return new Promise((resolve, reject) => {
		return gulp.src(scssFiles, options)
			.pipe(plumber())
			.pipe(gulpif(global.sassWatch === true, cached("scss")))
			.pipe(sassInheritance({
				dir: './src/styles/'
			}))
			.pipe(filter(function (file) {
				return !/\/_/.test(file.path) || !/^_/.test(file.relative);
			}))
			.pipe(sourcemaps.init({
				largeFile: true
			}))
			.pipe(
				sass({
					fiber: fibers,
					outputStyle: "expanded",
					sourceComments: false,
					indentType: "tab",
					indentWidth: 1,
					includePaths: [
						path.resolve(themeRoot, files.nodeModules)
					],
					importer: (url) => {
						if(url.indexOf("~") !== 0) {
							return {
								file: url
							};
						}

						return {
							file: path.resolve(themeRoot, files.nodeModules, url.substr(1))
						};
					}
				})
					.on('error', sass.logError)
			)
			.pipe(rename({
				prefix: files.filePrefix || '',
				suffix: '.build',
				dirname: ""
			}))
			.pipe(postcss(plugins, {}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(files.compileOutput))
			.on("end", resolve)
			.on("error", reject);
	});
};