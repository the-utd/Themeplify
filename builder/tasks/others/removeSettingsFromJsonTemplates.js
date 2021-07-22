const { removeSettingsFromJsonTemplates } = themeplify.functions.others;
const settingsDir = themeplify.files.settingsDir;

const removeSettingsFromJsonTemplatesTask = () => {
	return removeSettingsFromJsonTemplates(`${settingsDir}/templates/*.json`);
};

removeSettingsFromJsonTemplatesTask.displayName = "themekit:remove-settings-from-templates";

module.exports = removeSettingsFromJsonTemplatesTask;
