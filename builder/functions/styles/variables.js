'use strict';
const { through } = buildify.packages;
const transformSettings = (groups) => {
    const settingTypes = ["color", "text", "image_picker"];

    return groups.filter(group => {
        return group.hasOwnProperty("name") && group.hasOwnProperty("settings");
    }).map(group => {
        return group.settings.filter(setting => {
            return setting.type !== 'header';
        }).reduce((settings, setting) => {
            if(!settingTypes.includes(setting.type)) {
                return settings;
            }

            const name = `settings-${setting.id.replace(/[_.]/gm, "-")}`;

            return {
                ...settings,
                [`--${name}`]: `{%- assign s = settings['${setting.id}'] -%}{%- if s != blank -%}{%- assign s = s | json -%}{%- unless s contains n -%}{{- s -}}{%- else -%}unset{%- endunless -%}{%- else -%}unset{%- endif -%}`
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

        const settings 				= JSON.parse(file.contents.toString('utf-8'));
        const transformedSettings 	= transformSettings(settings);

        const variables = Object.keys(transformedSettings).map(key => `${key}: ${transformedSettings[key]}`).join(";");

        const content = `{%- comment -%}\n\tAuto-generated file. Dont change!\n{%- endcomment -%}\n{% assign n = "json not allowed for this object" %}{%- capture variables -%}${variables}{%- endcapture -%}<style>:root{ {{- variables | strip -}} }</style>`;

        file.contents = Buffer.from(content, 'utf-8');

        callback(null, file);
    });
};