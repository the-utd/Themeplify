const { themeRoot }	= themeplify;
const { themekit, gulplog, ansi } = themeplify.packages;

async function downloadSettings() {
	const config 	= themeplify.options.themekit;
	const dir		= config.dir;

	const ignore_files 	= [
		...config.ignore_files,
		'/snippets/atb-icon-([a-zA-Z0-9\\_\\-\\.]+)\\.liquid/',
		'templates/index.settings.liquid',
		'templates/index.translations.liquid',
		'snippets/variables.css.liquid',
		'/assets/icon-([a-zA-Z0-9\\_\\-\\.]+)\\.svg/',
		'templates/*.json'
	];

	try {
		await themekit.command("download", {
			"dir": dir,
			"store": config.store,
			"password": config.password,
			"themeid": config["theme_id"],
			"ignoredFiles": ignore_files,
			"env": config.env,
			"allowLive": true,
			"noIgnore": config.noIgnore,
			"timeout": config.timeout,
		}, {
			cwd: themeRoot,
			logLevel: "silent"
		});
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

downloadSettings.displayName = "themekit:download-files";

module.exports = downloadSettings;
