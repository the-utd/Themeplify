const fs    = require("fs");
const path  = require("path");

const { themeRoot }	    = themeplify;
const { gulp, ansi }    = themeplify.packages;

const args = themeplify.args;

const configWatch = async () => {
	try {
		const config 		= args.config || "config.yml";
		const configPath 	= path.join(themeRoot, config);
		try {
			fs.readFileSync(configPath, "utf8");
		} catch (error) {
			throw new Error("Config file not exist");
		}

		let watchTask = null;

		function configWatch() {
			watchTask.close(1);

			console.warn(ansi.red("The config file has been changed. Stop processing upload"));

			process.exit(1);
		}

		configWatch.displayName = "config:watch";

		watchTask = gulp.watch(configPath, configWatch);
	} catch (error) {
		console.warn(ansi.red(error.message));

		process.exit(1);
	}
};

configWatch.displayName = "config:watch";

module.exports = configWatch;
