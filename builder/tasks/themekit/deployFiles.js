const { themeRoot }	= themeplify;
const { themekit, gulplog, ansi} = themeplify.packages;

async function deployFiles() {
	const config = themeplify.options.themekit;

	try {
		// await themekit.command("deploy", {
		// 	"dir": config.dir,
		// 	"store": config.store,
		// 	"password": config.password,
		// 	"themeid": config["theme_id"],
		// 	"ignoredFiles": config.ignore_files,
		// 	"env": config.env,
		// 	"allowLive": true,
		// 	"nodelete": !config.force,
		// 	"allenvs": config.allenvs,
		// 	"noIgnore": config.noIgnore,
		// 	"timeout": config.timeout,
		// }, {
		// 	cwd: themeRoot,
		// 	logLevel: "silent"
		// });
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

deployFiles.displayName = "themekit:deploy-files";

module.exports = deployFiles;
