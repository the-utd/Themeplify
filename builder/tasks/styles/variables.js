const { themePath }     = themeplify.helpers;
const { gulp, rename }  = themeplify.packages;
const { variables }     = themeplify.functions.styles;

const buildCssVarianblesFromSettings = () => {
    return gulp.src(`./src/config/settings_schema.json`, {
			allowEmpty: true
		})
        .pipe(variables())
        .pipe(rename("variables.css.liquid"))
        .pipe(gulp.dest(themePath('./dist/snippets')));
}

buildCssVarianblesFromSettings.displayName = "settings:css-variables:build";

module.exports = buildCssVarianblesFromSettings;
