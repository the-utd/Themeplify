const { mergeSettingsFromDeploymentTheme } = themeplify.functions.others;

const mergeSettingsFromDeploymentThemeTask = () => {
	return mergeSettingsFromDeploymentTheme("./src/templates/*.json");
};

mergeSettingsFromDeploymentThemeTask.displayName = "themekit:merge-settings-from-deployment-theme";

module.exports = mergeSettingsFromDeploymentThemeTask;
