const { gulp } = themeplify.packages;
const { themePath } = themeplify.helpers;
const { mergeSettingsFromDeploymentTheme } = themeplify.functions.others;

const mergeSettingsFromDeploymentThemeTask = () => {
	return gulp.src("./src/templates/*.json", {
		allowEmpty: true
	})
	.pipe(mergeSettingsFromDeploymentTheme())
	.pipe(gulp.dest(themePath("./dist/templates")))
};

mergeSettingsFromDeploymentThemeTask.displayName = "themekit:merge-settings-from-deployment-theme";

module.exports = mergeSettingsFromDeploymentThemeTask;
