const { themePath }     = themeplify.helpers;
const { gulp, rename, translations }  = themeplify.packages;

const buildTranslations = () => {
    return gulp.src(`./src/locales/*.default.json`, {
			allowEmpty: true
		})
        .pipe(translations())
        .pipe(rename("index.translations.liquid"))
        .pipe(gulp.dest(themePath('./dist/templates')));
};

buildTranslations.displayName = "translations:build";

module.exports = buildTranslations;
