const { themePath }     = buildify.helpers;
const { gulp, rename }  = buildify.packages;
const { variables }     = buildify.functions.styles;

const buildCssVarianblesFromSettings = () => {
    return gulp.src(`./src/config/settings_schema.json`)
        .pipe(variables())
        .pipe(rename("variables.css.liquid"))
        .pipe(gulp.dest(themePath('./dist/snippets')));
}

buildCssVarianblesFromSettings.displayName = "settings:css-variables:build";

module.exports = buildCssVarianblesFromSettings;