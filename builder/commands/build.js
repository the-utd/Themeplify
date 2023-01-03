const buildScss         = require("../tasks/styles/build");
const buildScssMinify   = require("../tasks/styles/minify");
const buildJs           = require("../tasks/js/build");
const buildTranslations = require("../tasks/others/translations");
const buildSettings     = require("../tasks/others/settings");
const buildCssVarianblesFromSettings = require("../tasks/styles/variables");
const copyBuild         = require("../tasks/others/copy");
const svgBuild          = require("../tasks/images/svg");

const customConfig = themeplify.customConfig;
const minifyJs     = customConfig.minify ? require("../tasks/js/minify") : async () => {};
const clearThemekitWorkingDirectory = require("../tasks/others/clearThemekitWorkingDirectory");

const { gulp } = themeplify.packages;

const build = gulp.series([
    clearThemekitWorkingDirectory,
    gulp.parallel(
        gulp.series(
			buildScss,
			buildScssMinify,
		),
        gulp.series(
            buildJs,
            minifyJs
        ),
        buildTranslations,
        buildSettings,
        buildCssVarianblesFromSettings
    ),
    copyBuild,
    svgBuild,
]);

build.displayName = "build";

module.exports = build;
