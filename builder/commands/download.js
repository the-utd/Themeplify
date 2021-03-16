const themekitDownload          = require("../tasks/themekit/download");
const svgUpdate                 = require("../tasks/images/updateSvg");
const removeIconsFromSnippets   = require("../tasks/images/removeIconsFromSnippets");

const { gulp } = global.buildify.packages;

const download = gulp.series([
    themekitDownload,
    svgUpdate,
    removeIconsFromSnippets
]);

download.displayName = "download";

module.exports = download;