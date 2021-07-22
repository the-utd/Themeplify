const through = require("through2");

module.exports = () => {
	return through.obj(function (file, enc, callback) {
		if(file === null || file.isDirectory()){
			callback(null, file);
			return;
		}

		const transformedTemplate = JSON.parse(file.contents.toString('utf-8'));
		const content = JSON.stringify({
			...transformedTemplate,
			sections: Object.keys(transformedTemplate.sections).reduce((sections, sectionName) => {
				const section = transformedTemplate.sections[sectionName];

				return {
					...sections,
					[sectionName]: {
						type: section.type
					}
				}
			}, {}),
		}, null, '\t');

		file.contents = Buffer.from(content, 'utf-8');

		callback(null, file);
	});
}
