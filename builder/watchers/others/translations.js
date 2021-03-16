const { gulp } = buildify.packages;

const buildTranslations = require("../../tasks/others/translations");

const translationsWatch = () =>  {
    return gulp.watch(`./src/locales/*.default.json`, buildTranslations);
};

translationsWatch.displayName = "translations:watch";

module.exports = translationsWatch;