'use strict';
const { through } = buildify.packages;

const transformSettings = (groups) => {
	return groups.filter(group => {
		return group.hasOwnProperty("name") && group.hasOwnProperty("settings");
	}).map(group => {
		return group.settings.filter(setting => {
			return setting.type !== 'header';
		}).reduce((settings, setting) => {
			return {
				...settings,
				[setting.id]: `{{- settings['${setting.id}'] | json -}}`
			}
		}, {})
	}).reduce((settings, group) => {
		return {
			...settings,
			...group
		}
	}, {});
};

module.exports = () => {
	return through.obj(function (file, enc, callback) {
		if(file === null || file.isDirectory()){
			callback(null, file);
			return;
		}

		const settings = JSON.parse(file.contents.toString('utf-8'));
		const transformedTranslations = transformSettings(settings);
		const json = JSON.stringify(transformedTranslations)
			.replace(new RegExp(/"{{/gm), "{{")
			.replace(new RegExp(/}}"/gm), "}}");

		const content = `{%- comment -%}\n\tAuto-generated file. Dont change!\n{%- endcomment -%}\n{%- layout none -%}{%- capture content -%}{{- content_for_index -}}{%- endcapture -%}{%- capture settings -%}${json}{%- endcapture -%}{{- settings | strip -}}`;

		file.contents = Buffer.from(content, 'utf-8');

		callback(null, file);
	});
};
