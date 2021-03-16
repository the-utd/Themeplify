const { gulp } = global.buildify.packages;

const deploy = require("./deploy");
const watch = require("./watch");

const start         = gulp.series(deploy, watch);
start.displayName   = "start";

module.exports = start;