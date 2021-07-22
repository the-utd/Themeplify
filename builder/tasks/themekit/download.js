const { gulp } = themeplify.packages;
const removeSettingsFromJsonTemplatesTask = require("./../others/removeSettingsFromJsonTemplates");
const downloadSettings = require("./downloadSettings");
const downloadFiles = require("./downloadFiles");

const download = gulp.series(
	downloadSettings,
	downloadFiles,
	removeSettingsFromJsonTemplatesTask
)

download.displayName = "themekit:download";

module.exports = download;
