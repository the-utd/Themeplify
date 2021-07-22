const { gulp } = themeplify.packages;
const { themePath } = themeplify.helpers;
const { removeSettingsFromJsonTemplates } = themeplify.functions.others;
const settingsDir = themeplify.files.settingsDir;

const removeSettingsFromJsonTemplatesTask = () => {
	return gulp.src(`${settingsDir}/templates/*.json`, {
		allowEmpty: true
	})
	.pipe(removeSettingsFromJsonTemplates())
	.pipe(gulp.dest(themePath("./src/templates")))
};

removeSettingsFromJsonTemplatesTask.displayName = "themekit:remove-settings-from-templates";

module.exports = removeSettingsFromJsonTemplatesTask;
