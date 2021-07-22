const { through } = themeplify.packages;

module.exports = () => {
	return through.obj(function (file, enc, callback) {
		if(file === null || file.isDirectory()){
			callback(null, file);
			return;
		}

		let transformedTemplate = JSON.parse(file.contents.toString('utf-8'));

		try {
			const filePath = `./.themeplify/settings/templates/${path.basename(file.path)}`;

			if (fs.existsSync(filePath)) {
				const currentSectionFile = fs.readFileSync(filePath, 'utf8');
				const currentSectionSettings = JSON.parse(currentSectionFile);

				const sectionNames = Object.keys(transformedTemplate.sections);

				transformedTemplate = {
					...transformedTemplate,
					sections: sectionNames.reduce((sections, sectionName) => {
						const section 			= transformedTemplate.sections[sectionName];
						let currentSettings 	= currentSectionSettings.sections[sectionName];

						return {
							...sections,
							[sectionName]: {
								type: section.type,
								...currentSettings
							}
						}
					}, {}),
					order: currentSectionSettings.order.filter(sectionName => {
						return currentSectionSettings.order.includes(sectionName);
					})
				}
			}
		} catch (error) {}

		const content = JSON.stringify(transformedTemplate, null, '\t');

		file.contents = Buffer.from(content, 'utf-8');

		callback(null, file);
	});
};
