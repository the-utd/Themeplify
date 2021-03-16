const build = require("./build");
const themekitDeploy = require("../tasks/themekit/deploy");

const { gulp }      = global.buildify.packages;
const deploy        = gulp.series(build, themekitDeploy);
deploy.displayName  = "deploy";

module.exports = deploy;