const { themeRoot }	= themeplify;
const { themekit } = themeplify.packages;
const fs = require("fs");

module.exports = async (copyFiles = [
	"config/*.json",
	"templates/*.json",
	"templates/customers/*.json"
], options = {}) => {
	const config = themeplify.options.themekit;

	const ignore_files 	= [
		...config.ignore_files,
		'/snippets/atb-icon-([a-zA-Z0-9\\_\\-\\.]+)\\.liquid/',
		'templates/index.settings.liquid',
		'templates/index.translations.liquid',
		'snippets/variables.css.liquid',
		'/assets/icon-([a-zA-Z0-9\\_\\-\\.]+)\\.svg/'
	];

	const settingsDir = themeplify.files.settingsDir;
	if(!fs.existsSync(settingsDir)) {
		fs.mkdirSync(settingsDir);
	}

	try {
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
				...(Array.isArray(copyFiles) ? copyFiles : [copyFiles])
			]
		}, {
			cwd: themeRoot,
			logLevel: "silent"
		});
	} catch (e) {
		console.log(e)
	}
};
