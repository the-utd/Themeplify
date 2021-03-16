const { themePath }     = buildify.helpers;
const { gulp, rename }  = buildify.packages;
const { settings }      = buildify.functions.others;

const buildSettings = () => {
    return gulp.src(`./src/config/settings_schema.json`)
        .pipe(settings())
        .pipe(rename("index.settings.liquid"))
        .pipe(gulp.dest(themePath('./dist/templates')));
};

buildSettings.displayName = "settings:build";

module.exports = buildSettings;