const { themeRoot }	= buildify;
const { themekit, gulplog, ansi } = buildify.packages;

async function download() {
	const config 	= buildify.options.themekit;
	const dir		= config.dir;

	const ignore_files 	= [
		...config.ignore_files,
		'/snippets/atb-icon-([a-zA-Z0-9\\_\\-\\.]+)\\.liquid/',
		'templates/index.settings.liquid',
		'templates/index.translations.liquid',
		'snippets/variables.css.liquid',
		'/assets/icon-([a-zA-Z0-9\\_\\-\\.]+)\\.svg/'
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

download.displayName = "themekit:download";

module.exports = download;
