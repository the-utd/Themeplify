const { themeRoot }	= buildify;
const { themekit, gulplog, ansi } = buildify.packages;

async function watch() {
	const config = buildify.options.themekit;

	try {
		await themekit.command("watch", {
			"dir": config.dir,
			"store": config.store,
			"password": config.password,
			"themeid": config["theme_id"],
			"ignoredFiles": [
				...config.ignore_files,
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.css/",
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.min\.css/",
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.map\.css/",
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.js/",
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.min\.js/",
				"/([a-zA-z0-9\\_\\-\\.]+)\.build\.map\.js/",
			],
			"env": config.env,
			"allowLive": true,
			"noIgnore": config.noIgnore,
			"timeout": config.timeout,
		}, {
			cwd: themeRoot,
			logLevel: "all"
		});
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

watch.displayName = "themekit:watch";

module.exports = watch;
