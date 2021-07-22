const mergeSettingsFromDeploymentTheme = require("../../packages/mergeSettingsFromDeploymentTheme");
const { gulp } = themeplify.packages;
const { themePath } = themeplify.helpers;

module.exports = (copyFiles = "./src/templates/*.json", options = {}) => {
	return gulp.src(copyFiles, {
		allowEmpty: true,
		...options,
	})
	.pipe(mergeSettingsFromDeploymentTheme())
	.pipe(gulp.dest(themePath("./dist/templates")))
};
