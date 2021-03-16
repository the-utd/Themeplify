const { gulp }  = global.buildify.packages;
const build     = require("./build");
const archive   = require("../tasks/others/archive");

const zip       = gulp.series(build, archive);
zip.displayName = "zip";

module.exports  = zip;