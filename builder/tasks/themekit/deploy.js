const { gulp } 							= themeplify.packages;
const downloadSettings 					= require("./downloadSettings");
const mergeSettingsFromDeploymentTheme 	= require("./../others/mergeSettingsFromDeploymentTheme");
const deployFiles 						= require("./deployFiles");

const deploy = gulp.series(
	downloadSettings,
	mergeSettingsFromDeploymentTheme,
	deployFiles,
)

deploy.displayName = "themekit:deploy";

module.exports = deploy;
