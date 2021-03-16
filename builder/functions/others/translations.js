'use strict';
const { through } = buildify.packages;

const transformTranslations = (translations, prefix = "") => {
	return Object.keys(translations).reduce((transformedTranslations, key) => {
		let value = translations[key];
		let prefixedKey = prefix !== "" ? `${prefix}.${key}` : key;

		if(typeof value === 'object'){
			return {
				...transformedTranslations,
				[key]: transformTranslations(value, prefixedKey)
			};
		}

		return {
			...transformedTranslations,
			[key]: `{{- '${prefixedKey}' | t | json -}}`
		};
	}, {});
};

module.exports = () => {
	return through.obj(function (file, enc, callback) {
		if(file === null || file.isDirectory()){
			callback(null, file);
			return;
		}

		const settings = JSON.parse(file.contents.toString('utf-8'));
		const transformedTranslations = transformTranslations(settings, "");
		const json = JSON.stringify(transformedTranslations, null, '\t')
			.replace(new RegExp(/"{{/gm), "{{")
			.replace(new RegExp(/}}"/gm), "}}");

		const content = `{%- comment -%}\n\tAuto-generated file. Dont change!\n{%- endcomment -%}\n{%- layout none -%}{%- capture content -%}{{- content_for_index -}}{%- endcapture -%}{%- capture translations -%}${json}{%- endcapture -%}{{- translations -}}`;

		file.contents = Buffer.from(content, 'utf-8');

		callback(null, file);
	});
};
