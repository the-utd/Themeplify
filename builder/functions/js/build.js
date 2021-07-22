const {
	webpack,
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

		const compiler = webpack({
			...webpackConfig,
			entry: entryFiles,
			mode: "production",
		});

		try {
			compiler.run(() => {
				resolve();
			})
		} catch (error) {
			reject(error);
		}
	});
};
