const { gulplog, ansi } = themeplify.packages;
const { downloadSettings } = themeplify.functions.others

async function downloadSettingsTask() {
	try {
		await downloadSettings();
	} catch (error) {
		gulplog.error(ansi.red(error));
	}
}

downloadSettingsTask.displayName = "themekit:download-settings";

module.exports = downloadSettingsTask;
