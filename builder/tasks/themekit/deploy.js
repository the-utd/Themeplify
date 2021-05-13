const { themeRoot }	= buildify;
const { themekit, gulplog, ansi } = buildify.packages;

async function deploy() {
	const config = buildify.options.themekit;

	try {
		await themekit.command("deploy", {
			"dir": config.dir,
			"store": config.store,
			"password": config.password,
			"themeid": config["theme_id"],
			"ignoredFiles": config.ignore_files,
			"env": config.env,
			"allowLive": true,
			"nodelete": !config.force,
			"allenvs": config.allenvs
		}, {
			cwd: themeRoot,
			logLevel: "silent"
		});
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

deploy.displayName = "themekit:deploy";

module.exports = deploy;
