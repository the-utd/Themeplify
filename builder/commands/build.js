const buildScss         = require("../tasks/styles/build");
const buildScssMinify   = require("../tasks/styles/minify");
const buildJs           = require("../tasks/js/build");
const buildTranslations = require("../tasks/others/translations");
const buildSettings     = require("../tasks/others/settings");
const buildCssVarianblesFromSettings = require("../tasks/styles/variables");
const copyBuild         = require("../tasks/others/copy");
const svgBuild          = require("../tasks/images/svg");
const minifyJs          = require("../tasks/js/minify");
const clearThemekitWorkingDirectory = require("../tasks/others/clearThemekitWorkingDirectory");

const { gulp } = global.buildify.packages;

const build = gulp.series([
    clearThemekitWorkingDirectory,
    gulp.parallel(
        buildScss,
        buildScssMinify,
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
