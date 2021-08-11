const { themePath } = themeplify.helpers;
const settingsDir 	= themeplify.files.settingsDir;
const through 		= require("through2");
const path 			= require("path");
const fs			= require("fs");

module.exports = () => {
	return through.obj(function (file, enc, callback) {
		if(file === null || file.isDirectory()){
			callback(null, file);
			return;
		}

		let transformedTemplate = JSON.parse(file.contents.toString('utf-8'));

		try {
			const filePath = themePath(`./${settingsDir}/templates/${path.basename(file.path)}`);

			if (fs.existsSync(filePath)) {
				const currentSectionFile = fs.readFileSync(filePath, 'utf8');
				const currentSectionSettings = JSON.parse(currentSectionFile);

				const sectionNames = [...(new Set([...Object.keys(currentSectionSettings.sections), ...Object.keys(transformedTemplate.sections)]))];
				const mergedSections = {
					...transformedTemplate.sections,
					...currentSectionSettings.sections
				};

				transformedTemplate = {
					...transformedTemplate,
					sections: sectionNames.reduce((sections, sectionName) => {
						const section = mergedSections[sectionName];

						return {
							...sections,
							[sectionName]: section
						}
					}, {}),
					order: Array.from(new Set([...currentSectionSettings.order, ...transformedTemplate.order]))
				}
			}
		} catch (error) {
			console.log(error.message);
		}

		const content = JSON.stringify(transformedTemplate, null, '\t');

		file.contents = Buffer.from(content, 'utf-8');

		callback(null, file);
	});
};
