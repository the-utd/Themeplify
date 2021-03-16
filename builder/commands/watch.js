const svgWatch = require("../watchers/images/svg");
const watchScssCompile = require("../watchers/styles/build");
const copyWatch = require("../watchers/others/copy");
const translationsWatch = require("../watchers/others/translations");
const settingsWatch = require("../watchers/others/settings");
const configWatch = require("../watchers/others/config");
const server = require("../tasks/others/server");
const themekitWatch = require("../tasks/themekit/watch");
const build = require("../commands/build");

const path			= require("path");
const fs			= require("fs");
const { gulp }      = global.buildify.packages;
const { themeRoot }	= buildify;
const files         = buildify.files;

const watch = () => {
    const tasks = gulp.parallel(
        svgWatch,
        watchScssCompile,
        copyWatch,
        translationsWatch,
        settingsWatch,
        configWatch,
        server,
        themekitWatch
    );

    const dir = path.resolve(themeRoot, files.themekit.watch);
    if(fs.existsSync(dir)) {
        return tasks;
    }

    return gulp.series(build, tasks);
};

watch.displayName   = "watch";
module.exports      = watch();
