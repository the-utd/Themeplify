const removeSettingsFromJsonTemplates = require("../../packages/removeSettingsFromJsonTemplates")
const { gulp } = themeplify.packages;
const { themePath } = themeplify.helpers;
const settingsDir = themeplify.files.settingsDir;

module.exports = (copyFiles = `./${settingsDir}/templates/*.json`, options = {}) => {
	return gulp.src(copyFiles, {
		allowEmpty: true,
		...options,
	})
	.pipe(removeSettingsFromJsonTemplates())
	.pipe(gulp.dest(themePath("./src/templates")))
};
