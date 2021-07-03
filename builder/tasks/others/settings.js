const { themePath }     			= themeplify.helpers;
const { gulp, rename, settings }  	= themeplify.packages;

const buildSettings = () => {
    return gulp.src(`./src/config/settings_schema.json`, {
			allowEmpty: true
		})
        .pipe(settings())
        .pipe(rename("index.settings.liquid"))
        .pipe(gulp.dest(themePath('./dist/templates')));
};

buildSettings.displayName = "settings:build";

module.exports = buildSettings;
