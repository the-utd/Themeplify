const { themeRoot }	= themeplify;
const { themekit, gulplog, ansi } = themeplify.packages;
const fs = require("fs");

async function downloadSettings() {
	const config = themeplify.options.themekit;

	const ignore_files 	= [
		...config.ignore_files,
		'/snippets/atb-icon-([a-zA-Z0-9\\_\\-\\.]+)\\.liquid/',
		'templates/index.settings.liquid',
		'templates/index.translations.liquid',
		'snippets/variables.css.liquid',
		'/assets/icon-([a-zA-Z0-9\\_\\-\\.]+)\\.svg/'
	];

	try {
		const settingsDir = themeplify.files.settingsDir;
		if(!fs.existsSync(settingsDir)) {
			fs.mkdirSync(settingsDir);
		}

		await themekit.command("download", {
			"dir": settingsDir,
			"store": config.store,
			"password": config.password,
			"themeid": config["theme_id"],
			"ignoredFiles": ignore_files,
			"env": config.env,
			"allowLive": true,
			"noIgnore": config.noIgnore,
			"timeout": config.timeout,
			"files": [
				"config/*.json",
				"templates/*.json",
				"templates/customers/*.json"
			]
		}, {
			cwd: themeRoot,
			logLevel: "silent"
		});
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

downloadSettings.displayName = "themekit:download-settings";

module.exports = downloadSettings;
